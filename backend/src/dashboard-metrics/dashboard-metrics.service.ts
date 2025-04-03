import { Injectable } from '@nestjs/common';
import { DashboardMetrics } from './dto/dashboard-metrics.dto';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ExpenseByCategoryResponse } from './dto/expense-category.dto';
import { ExpenseTrendsResponse } from './dto/expense-trends.dto';
import { IncomeSource } from './dto/income-source.dto';
import { IncomeVsExpenses } from './dto/income-vs-expenses.dto';

@Injectable()
export class DashboardMetricsService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,
  ) {}

  async getDashboardMetrics(userId: string): Promise<DashboardMetrics> {
    const income: number = await this.getTotalIncome(userId);
    const expenses: number = await this.getTotalExpenses(userId);
    const balance: number = income - expenses;
    const monthlyChange: number = await this.getMonthlyChange(userId);

    return { income, expenses, balance, monthlyChange };
  }

  async getTotalIncome(userId: string): Promise<number> {
    const result = await this.transactionModel.aggregate([
      { $match: { type: 'Income', userId: new Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    return result[0]?.total || 0;
  }

  async getTotalExpenses(userId: string): Promise<number> {
    const result = await this.transactionModel.aggregate([
      { $match: { type: 'Expense', userId: new Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    return result[0]?.total || 0;
  }

  async getMonthlyChange(userId: string): Promise<number> {
    const now: Date = new Date();

    const currentMonth: Date = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1),
    );
    const lastMonth: Date = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1),
    );

    const currentMonthBalance: number = await this.getBalanceForMonth(
      userId,
      currentMonth,
    );
    const lastMonthBalance: number = await this.getBalanceForMonth(
      userId,
      lastMonth,
    );

    return currentMonthBalance - lastMonthBalance;
  }

  async getBalanceForMonth(userId: string, monthStart: Date): Promise<number> {
    const nextMonth = new Date(monthStart);
    nextMonth.setMonth(nextMonth.getMonth() + 1); // Move to next month

    const result = await this.transactionModel.aggregate([
      {
        $match: {
          date: { $gte: monthStart, $lt: nextMonth }, // Get transactions only in this month
          userId: new Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: '$type', // _id stores "INCOME" or "EXPENSE"
          total: { $sum: '$amount' },
        },
      },
    ]);

    let income = 0;
    let expenses = 0;

    result.forEach((item) => {
      if (item._id === 'Income') {
        // 🔹 Use `_id` from aggregation
        income = item.total;
      } else if (item._id === 'Expense') {
        expenses = item.total;
      }
    });

    return income - expenses;
  }

  async getExpenseByCategory(
    userId: string,
    month: string,
  ): Promise<ExpenseByCategoryResponse> {
    const categories = await this.transactionModel.aggregate([
      {
        $addFields: {
          formattedMonth: {
            $dateToString: { format: '%Y-%m', date: '$date' }, // ✅ Extracts "YYYY-MM"
          },
        },
      },
      {
        $match: {
          type: 'Expense',
          userId: new Types.ObjectId(userId),
          formattedMonth: { $eq: month }, // ✅ Exact match on "YYYY-MM"
        },
      },
      {
        $group: {
          _id: '$category',
          value: { $sum: '$amount' },
        },
      },
      {
        $project: {
          name: '$_id',
          value: 1,
          _id: 0,
        },
      },
    ]);

    // 🔹 Assign category colors
    const categoryColors: Record<string, string> = {
      Groceries: '#16a34a',
      Transportation: '#ef4444',
      Housing: '#f59e0b',
      Utilities: '#3b82f6',
      Entertainment: '#f97316',
      Healthcare: '#d946ef',
      Personal: '#db2777',
      Education: '#6366f1',
      Shopping: '#eab308',
      Travel: '#0ea5e9',
      Other: '#6b7280',
    };

    return {
      categories: categories.map((cat) => ({
        name: cat.name,
        value: cat.value,
        color: categoryColors[cat.name] || '#6b7280',
      })),
    };
  }

  async getExpenseTrends(
    userId: string,
    days: number,
  ): Promise<ExpenseTrendsResponse> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days); // Start from selected range

    const expenses = await this.transactionModel.aggregate([
      {
        $match: {
          type: 'Expense',
          userId: new Types.ObjectId(userId),
          date: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          expense: { $sum: '$amount' },
        },
      },
      {
        $sort: { _id: 1 }, // Sort by date ascending
      },
      {
        $project: {
          date: '$_id',
          expense: 1,
          _id: 0,
        },
      },
    ]);

    return { expenses };
  }

  async getRecentTransactions(
    userId: string,
    limit: number,
  ): Promise<{ transactions: Transaction[] }> {
    const transactions = await this.transactionModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ date: -1 })
      .limit(limit)
      .exec();

    return { transactions };
  }

  async getIncomeSources(
    userId: string,
    month: string,
  ): Promise<IncomeSource[]> {
    const [year, monthNum] = month.split('-').map(Number);

    const startDate = new Date(Date.UTC(year, monthNum - 1, 1));
    const endDate = new Date(Date.UTC(year, monthNum, 1));

    const incomeCategories = await this.transactionModel.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId),
          type: 'Income',
          date: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },
      {
        $group: {
          _id: '$category',
          totalIncome: { $sum: '$amount' },
        },
      },
      {
        $project: {
          name: '$_id',
          value: '$totalIncome',
          _id: 0,
        },
      },
    ]);

    // Assign category colors
    const categoryColors: Record<string, string> = {
      Salary: '#16a34a',
      Freelance: '#ef4444',
      Investments: '#3b82f6',
      Other: '#6b7280',
    };

    return incomeCategories.map((cat) => ({
      ...cat,
      color: categoryColors[cat.name] || '#6b7280',
    }));
  }

  async getIncomeVsExpenses(
    userId: string,
    month: string,
  ): Promise<IncomeVsExpenses[]> {
    const startDate = new Date(`${month}-01T00:00:00.000Z`);
    const endDate = new Date(`${month}-31T23:59:59.999Z`);

    const transactions = await this.transactionModel.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId),
          date: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%b %d', date: '$date' } },
            type: '$type',
          },
          total: { $sum: '$amount' },
        },
      },
      {
        $group: {
          _id: '$_id.date',
          income: {
            $sum: {
              $cond: {
                if: { $eq: ['$_id.type', 'Income'] },
                then: '$total',
                else: 0,
              },
            },
          },
          expenses: {
            $sum: {
              $cond: {
                if: { $eq: ['$_id.type', 'Expense'] },
                then: '$total',
                else: 0,
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          date: '$_id',
          income: 1,
          expenses: 1,
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);

    return transactions;
  }
}
