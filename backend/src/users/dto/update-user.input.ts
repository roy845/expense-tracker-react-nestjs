import { InputType, Field, PartialType } from '@nestjs/graphql';
import { RegisterInput } from 'src/auth/dto/register.input';

@InputType()
export class BioInput {
  @Field(() => String, { nullable: true })
  welcomeMessage?: string;

  @Field(() => String, { nullable: true })
  avatar?: string;
}

@InputType()
export class UpdateUserInput extends PartialType(RegisterInput) {
  @Field(() => BioInput, { nullable: true })
  bio?: BioInput;
}
