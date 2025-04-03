import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class BudgetFilterArgs {
  @Field({ nullable: true })
  startDate?: string;

  @Field({ nullable: true })
  endDate?: string;
}
