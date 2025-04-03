import { Field, Float, InputType } from '@nestjs/graphql';
import {
  Category,
  PaymentMethod,
  TransactionType,
} from '../constants/transactions-constants';

@InputType()
export class CreateTransactionInput {
  @Field(() => Float)
  amount: number;

  @Field(() => TransactionType)
  type: TransactionType;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Category)
  category: Category;

  @Field()
  date: string;

  @Field(() => PaymentMethod)
  paymentMethod: PaymentMethod;

  @Field(() => Boolean, { defaultValue: false })
  recurringTransaction: boolean;

  @Field(() => [String], { nullable: true })
  tags?: string[];
}
