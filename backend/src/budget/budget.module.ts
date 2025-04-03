import { Module } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { BudgetResolver } from './budget.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Budget, BudgetSchema } from './entities/budget.entity';
import {
  Transaction,
  TransactionSchema,
} from 'src/transactions/entities/transaction.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    MongooseModule.forFeature([{ name: Budget.name, schema: BudgetSchema }]),
  ],
  providers: [BudgetResolver, BudgetService],
})
export class BudgetModule {}
