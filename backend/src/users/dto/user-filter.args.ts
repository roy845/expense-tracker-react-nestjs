import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class UserFilterArgs {
  @Field({ nullable: true })
  startDate?: string;

  @Field({ nullable: true })
  endDate?: string;
}
