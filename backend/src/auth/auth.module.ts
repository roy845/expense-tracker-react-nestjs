import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import {
  jwtConfigProvider,
  jwtRefreshConfigProvider,
} from 'src/config/jwt.config';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MailModule,
  ],
  providers: [
    AuthResolver,
    AuthService,
    JwtStrategy,
    jwtConfigProvider,
    jwtRefreshConfigProvider,
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
