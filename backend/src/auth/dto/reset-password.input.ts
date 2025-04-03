import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class ResetPasswordInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  token: string;

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
  @Field(() => String)
  newPassword: string;
}
