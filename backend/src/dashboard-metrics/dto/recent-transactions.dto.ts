import { Field, ObjectType } from '@nestjs/graphql';
import { Transaction } from 'src/transactions/entities/transaction.entity';

@ObjectType()
export class RecentTransactionsResponse {
  @Field(() => [Transaction])
  transactions: Transaction[];
}
