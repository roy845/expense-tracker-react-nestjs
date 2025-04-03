import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Transaction } from '../entities/transaction.entity';

@ObjectType()
export class TransactionListResponse {
  @Field(() => [Transaction])
  transactions: Transaction[];

  @Field(() => Int)
  totalPages: number;
}
