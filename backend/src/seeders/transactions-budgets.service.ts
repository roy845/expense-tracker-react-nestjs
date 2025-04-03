import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import {
  Category,
  PaymentMethod,
  TransactionType,
} from 'src/transactions/constants/transactions-constants';
import { Budget } from 'src/budget/entities/budget.entity';

const CATEGORIES = Object.values(Category);
const PAYMENT_METHODS = Object.values(PaymentMethod);
const TRANSACTION_TYPES = Object.values(TransactionType);

const getRandomItem = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const getRandomDateInMarch = (): Date => {
  const start = new Date('2025-03-01T00:00:00.000Z').getTime();
  const end = new Date('2025-03-31T00:00:00.000Z').getTime();
  return new Date(start + Math.random() * (end - start));
};

@Injectable()
export class DatabaseTransactionsBudgetsSeeder implements OnModuleInit {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionsModel: Model<Transaction>,
    @InjectModel(Budget.name)
    private readonly budgetModel: Model<Budget>,
  ) {}

  async onModuleInit() {
    const existingTxCount = await this.transactionsModel.countDocuments();
    const existingBudgetCount = await this.budgetModel.countDocuments();

    if (existingTxCount === 0 && existingBudgetCount === 0) {
      console.log('🌱 Seeding database with transactions and budgets...');
      const userId = new Types.ObjectId('67e819730544ac55529724d2');

      await this.seedBudgets(userId);
      await this.seedTransactions(userId);
      console.log(
        '✅ Seeding database with transactions and budgets complete.',
      );
    } else {
      console.log(
        '⚠️ Seed data with transactions and budgets already exists. Skipping seeding.',
      );
    }
  }

  private async seedTransactions(userId: Types.ObjectId) {
    const transactions = Array.from({ length: 100 }).map(() => {
      const type = getRandomItem(TRANSACTION_TYPES);
      const amount = parseFloat((Math.random() * 200 + 10).toFixed(2));

      return {
        amount,
        type,
        description:
          type === TransactionType.Income ? 'Income Source' : 'Expense Detail',
        category: getRandomItem(CATEGORIES),
        date: getRandomDateInMarch(),
        paymentMethod: getRandomItem(PAYMENT_METHODS),
        recurringTransaction: Math.random() < 0.2,
        tags: [],
        userId,
      };
    });

    await this.transactionsModel.insertMany(transactions);
  }

  private async seedBudgets(userId: Types.ObjectId) {
    const startDate = new Date('2025-03-01T00:00:00.000Z');
    const endDate = new Date('2025-03-31T00:00:00.000Z');

    const budgets = Array.from({ length: 100 }).map((_, i) => {
      const category = getRandomItem(CATEGORIES);

      return {
        userId,
        name: `${category} Budget ${i + 1}`,
        category,
        monthlyLimit: parseFloat((Math.random() * 500 + 100).toFixed(2)),
        startDate,
        endDate,
      };
    });

    await this.budgetModel.insertMany(budgets);
  }
}
