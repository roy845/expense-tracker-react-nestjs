import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class ForgotPasswordInput {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  email: string;
}
