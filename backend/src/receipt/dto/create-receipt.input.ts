import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateReceiptInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
