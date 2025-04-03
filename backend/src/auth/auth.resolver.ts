import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { RegisterInput } from './dto/register.input';
import { UserReponseDto } from './dto/user-response.tdo';
import { LoginInput } from './dto/login.input';
import { Request, Response } from 'express';
import { RefreshTokenResponseDto } from './dto/refresh-token-response.dto';
import { ForgotPasswordInput } from './dto/forgot-password.input';
import { ResetPasswordInput } from './dto/reset-password.input';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async register(@Args('registerInput') registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }

  @Mutation(() => UserReponseDto)
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context('res') res: Response,
  ) {
    return this.authService.login(loginInput, res);
  }

  @Query(() => RefreshTokenResponseDto)
  async refreshToken(
    @Context('req') req: Request,
    @Context('res') res: Response,
  ) {
    return this.authService.refreshToken(req, res);
  }

  @Query(() => Boolean)
  async logout(
    @Context('req') req: Request,
    @Context('res') res: Response,
  ): Promise<boolean> {
    return await this.authService.logout(req, res);
  }

  @Mutation(() => String)
  async forgotPassword(
    @Args('forgotPasswordInput') forgotPasswordInput: ForgotPasswordInput,
  ): Promise<string> {
    return await this.authService.forgotPassword(forgotPasswordInput);
  }

  @Mutation(() => String)
  async resetPassword(
    @Args('resetPasswordInput') resetPasswordInput: ResetPasswordInput,
  ): Promise<string> {
    return this.authService.resetPassword(resetPasswordInput);
  }

  @Query(() => String)
  healthCheck(): string {
    return 'GraphQL API is working!';
  }
}
