import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class IncomeSource {
  @Field()
  name: string;

  @Field(() => Float)
  value: number;

  @Field()
  color: string;
}
