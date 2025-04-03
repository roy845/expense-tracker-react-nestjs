import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class DashboardMetrics {
  @Field(() => Float)
  income: number;

  @Field(() => Float)
  expenses: number;

  @Field(() => Float)
  balance: number;

  @Field(() => Float)
  monthlyChange: number;
}
