import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Receipt {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
