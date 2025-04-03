import { ObjectType, Field, Float, Int } from '@nestjs/graphql';

@ObjectType()
export class TotalBudgetResponse {
  @Field(() => Float)
  totalBudget: number;

  @Field(() => Float)
  totalSpent: number;

  @Field(() => Int)
  budgetCount: number;
}
