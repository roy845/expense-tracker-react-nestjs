import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterInput } from './dto/register.input';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LoginInput } from './dto/login.input';
import { JWTPayload } from './types/jwt.types';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { ForgotPasswordInput } from './dto/forgot-password.input';
import { AuthUtils } from './utils/auth-utils';
import { MailService } from 'src/mail/mail.service';
import ResetPasswordTemplate from '../templates/resetPassword';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { ResetPasswordInput } from './dto/reset-password.input';
import { updatePermissionsFileForUser } from 'src/permissions/permissions.utils';
import { AVAILABLE_PERMISSIONS } from 'src/permissions/available-permissions';

@Injectable()
export class AuthService {
  private readonly EXPIRES_AT: number = 15 * 60 * 1000;
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject('JWT_SERVICE') private readonly jwtService: JwtService,
    @Inject('JWT_REFRESH_SERVICE')
    private readonly jwtRefreshService: JwtService,
    private mailService: MailService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async register(registerInput: RegisterInput): Promise<User> {
    const { username, email, password } = registerInput;

    const newUser = new this.userModel({
      username,
      email,
      password,
    });

    const savedUser = await newUser.save();
    updatePermissionsFileForUser(
      savedUser._id.toString(),
      AVAILABLE_PERMISSIONS,
    );

    return savedUser;
  }

  generateTokens(payload: JWTPayload): [string, string] {
    // Generate the access token
    const accessToken: string = this.jwtService.sign(payload);

    // Generate the refresh token
    const refreshToken: string = this.jwtRefreshService.sign(payload);

    return [accessToken, refreshToken];
  }

  async login(loginInput: LoginInput, res: Response) {
    const { email, password } = loginInput;

    const user: UserDocument | null = await this.userModel.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      const payload: JWTPayload = {
        _id: user._id,
        username: user.username,
        email: user.email,
        roles: user.roles,
      };

      const [accessToken, refreshToken] = this.generateTokens(payload);

      user.refreshToken = refreshToken;
      await user.save();

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000,
      });

      return {
        accessToken,
        refreshToken,
        message: `User ${user.username} logged in successfully`,
      };
    } else {
      throw new UnauthorizedException('Unauthorized');
    }
  }

  async refreshToken(req: Request, res: Response) {
    const cookies = req.cookies;

    if (!cookies?.refreshToken) return res.sendStatus(HttpStatus.UNAUTHORIZED);
    const refreshToken = cookies.refreshToken;

    const foundUser = await this.userModel.findOne({ refreshToken });
    if (!foundUser) return res.sendStatus(HttpStatus.FORBIDDEN);

    const payload: JWTPayload = {
      _id: foundUser._id,
      username: foundUser?.username,
      email: foundUser?.email,
      roles: foundUser?.roles,
    };

    try {
      const decoded: JWTPayload = this.jwtRefreshService.verify(refreshToken);
      if (foundUser.username !== decoded.username) {
        return res.sendStatus(HttpStatus.FORBIDDEN);
      }

      const accessToken: string = this.jwtService.sign(payload);

      return {
        accessToken,
        message: `access token refreshed successfully`,
      };
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Refresh token expired');
      }
      return res.sendStatus(HttpStatus.FORBIDDEN);
    }
  }

  async logout(req: Request, res: Response) {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) {
      return false;
    }

    const refreshToken = cookies.refreshToken;
    const foundUser = await this.userModel.findOne({ refreshToken });

    if (!foundUser) {
      res.cookie('refreshToken', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        expires: new Date(0),
      });
      return true;
    }

    try {
      // Delete refreshToken from DB
      foundUser.refreshToken = undefined;
      await foundUser.save();

      res.cookie('refreshToken', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        expires: new Date(0),
      });
      return true;
    } catch (error) {
      console.error('Error while logging out:', error);
      return false;
    }
  }

  async forgotPassword(
    forgotPasswordInput: ForgotPasswordInput,
  ): Promise<string> {
    const { email } = forgotPasswordInput;
    const user: UserDocument | null = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    } else {
      const token: string = AuthUtils.generateResetPasswordToken();
      const expiresAt: Date = new Date(Date.now() + this.EXPIRES_AT);
      const resetLink: string = `http://localhost:5001/reset-password/${token}`;

      if (!user.resetPassword) {
        user.resetPassword = { token: '', expiresAt: new Date() };
      }

      user.resetPassword.token = token;
      user.resetPassword.expiresAt = expiresAt;

      await user.save();

      await this.mailService.sendMail(
        email,
        'Reset Password Link',
        ResetPasswordTemplate(
          AuthUtils.extractUsernameFromEmail(email),
          resetLink,
        ),
      );
      this.schedulePasswordResetDeletion(user);
      return 'Reset email sent successfully';
    }
  }

  private schedulePasswordResetDeletion(user: UserDocument) {
    const jobName = `delete-reset-token-${user._id}`;

    // Cancel any existing job for this user
    if (this.schedulerRegistry.doesExist('cron', jobName)) {
      this.schedulerRegistry.deleteCronJob(jobName);
    }

    const job = new CronJob(
      new Date(Date.now() + this.EXPIRES_AT),
      async () => {
        user.resetPassword = undefined;
        await user.save();
        console.log('Expired reset token deleted.');
      },
    );

    this.schedulerRegistry.addCronJob(jobName, job);
    job.start();
  }

  async resetPassword(resetPasswordInput: ResetPasswordInput): Promise<string> {
    const { token, newPassword } = resetPasswordInput;

    const user: UserDocument | null = await this.userModel.findOne({
      'resetPassword.token': token,
    });

    if (!user || !user.resetPassword) {
      throw new BadRequestException('Invalid or expired reset token.');
    }

    if (user.resetPassword.expiresAt < new Date()) {
      throw new BadRequestException('Reset token has expired.');
    }

    user.password = newPassword;
    user.resetPassword = undefined;

    await user.save();

    const jobName = `delete-reset-token-${user._id}`;
    if (this.schedulerRegistry.doesExist('cron', jobName)) {
      this.schedulerRegistry.deleteCronJob(jobName);
    }

    return 'Password reset successfully';
  }
}
