import { Field, InputType } from '@nestjs/graphql';
import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

@InputType()
export class LoginInput {
  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(100)
  email: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password too weak. It must contain at least one uppercase letter (A-Z), ' +
      'at least one lowercase letter (a-z), and at least one digit (0-9) or ' +
      'special character (any non-word character).',
  })
  password: string;
}
