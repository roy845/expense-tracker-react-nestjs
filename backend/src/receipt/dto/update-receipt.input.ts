import { CreateReceiptInput } from './create-receipt.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateReceiptInput extends PartialType(CreateReceiptInput) {
  @Field(() => Int)
  id: number;
}
