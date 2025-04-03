import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from 'src/auth/entities/user.entity';
import {
  Transaction,
  TransactionSchema,
} from 'src/transactions/entities/transaction.entity';
import { Budget, BudgetSchema } from 'src/budget/entities/budget.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    MongooseModule.forFeature([{ name: Budget.name, schema: BudgetSchema }]),
  ],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
