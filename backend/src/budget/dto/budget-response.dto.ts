import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BudgetResponse {
  @Field(() => String)
  id: string;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  category: string;

  @Field(() => Number)
  monthlyLimit: number;

  @Field(() => Number)
  spent: number;

  @Field(() => Number)
  remaining: number;

  @Field(() => Number)
  usedPercentage: number;

  @Field(() => String, { nullable: true })
  startDate?: string;

  @Field(() => String, { nullable: true })
  endDate?: string;
}
