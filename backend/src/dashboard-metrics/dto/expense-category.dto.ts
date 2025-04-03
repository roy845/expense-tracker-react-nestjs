import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ExpenseCategory {
  @Field()
  name: string;

  @Field()
  value: number;

  @Field()
  color: string;
}

@ObjectType()
export class ExpenseByCategoryResponse {
  @Field(() => [ExpenseCategory])
  categories: ExpenseCategory[];
}
