import { Field, Float, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateTransactionInput } from './create-transaction.input';
import {
  Category,
  PaymentMethod,
  TransactionType,
} from '../constants/transactions-constants';

@InputType()
export class UpdateTransactionInput extends PartialType(
  CreateTransactionInput,
) {
  @Field(() => Float, { nullable: true })
  amount?: number;

  @Field(() => TransactionType, { nullable: true })
  type?: TransactionType;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Category, { nullable: true })
  category?: Category;

  @Field({ nullable: true })
  date?: string;

  @Field(() => PaymentMethod, { nullable: true })
  paymentMethod?: PaymentMethod;

  @Field(() => Boolean, { nullable: true })
  recurringTransaction?: boolean;

  @Field(() => [String], { nullable: true })
  tags?: string[];
}
