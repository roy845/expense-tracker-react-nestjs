import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ExpenseTrend {
  @Field()
  date: string;

  @Field()
  expense: number;
}

@ObjectType()
export class ExpenseTrendsResponse {
  @Field(() => [ExpenseTrend])
  expenses: ExpenseTrend[];
}
