import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BudgetResponse } from './budget-response.dto';

@ObjectType()
export class PaginatedBudgetResponse {
  @Field(() => [BudgetResponse])
  budgets: BudgetResponse[];

  @Field(() => Int)
  totalPages: number;
}
