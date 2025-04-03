import { Module } from '@nestjs/common';
import { TransactionService } from './transactions.service';
import { TransactionsResolver } from './transactions.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './entities/transaction.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  providers: [TransactionsResolver, TransactionService],
})
export class TransactionsModule {}
