import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IncomeVsExpenses {
  @Field()
  date: string;

  @Field()
  income: number;

  @Field()
  expenses: number;
}
