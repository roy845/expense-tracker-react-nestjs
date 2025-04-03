import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateBudgetInput } from './dto/create-budget.input';
import { UpdateBudgetInput } from './dto/update-budget.input';
import { Budget, BudgetDocument } from './entities/budget.entity';
import { SearchArgs } from 'src/common/searchArgs';
import { PaginationArgs } from 'src/common/paginationArgs';
import { SortArgs } from 'src/common/sortArgs';
import { validateOwnership } from 'src/common/utils/validateOwnership';
import { UserJWTResponse } from 'src/auth/types/jwt.types';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { SortOrder } from 'src/common/sort-order.enum';

@Injectable()
export class BudgetService {
  constructor(
    @InjectModel(Budget.name) private budgetModel: Model<BudgetDocument>,
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
  ) {}

  // 🔹 Create Budget
  async create(
    userId: string,
    createBudgetDto: CreateBudgetInput,
  ): Promise<Budget> {
    const budget = new this.budgetModel({
      ...createBudgetDto,
      userId: new Types.ObjectId(userId),
    });
    return budget.save();
  }

  // 🔹 Find All Budgets
  async findAll(
    searchArgs: SearchArgs,
    paginationArgs: PaginationArgs,
    sortArgs: SortArgs,
  ): Promise<Budget[]> {
    const { search } = searchArgs;
    const { skip, take } = paginationArgs;
    const { sortBy = 'createdAt', order = 'asc' } = sortArgs;

    const filter = search
      ? {
          $or: [{ name: { $regex: search, $options: 'i' } }],
        }
      : {};

    return await this.budgetModel
      .find(filter)
      .sort({ [sortBy]: order })
      .skip((skip as number) - 1)
      .limit(take as number);
  }

  // 🔹 Find Budget by ID
  async findOne(user: UserJWTResponse, id: string): Promise<Budget> {
    const budget = await this.budgetModel.findById(id).exec();
    validateOwnership(user._id, budget, 'Budget');
    if (!budget) {
      throw new NotFoundException(`Budget with ID ${id} not found`);
    }
    return budget;
  }

  // 🔹 Find Budgets by User ID
  async findByUserId(userId: string): Promise<Budget[]> {
    return this.budgetModel.find({ userId: new Types.ObjectId(userId) }).exec();
  }

  // 🔹 Update Budget
  async update(
    id: string,
    user: UserJWTResponse,
    updateBudgetDto: UpdateBudgetInput,
  ): Promise<Budget> {
    const budget = await this.budgetModel.findById(id).exec();
    validateOwnership(user._id, budget, 'Budget');

    const updatedTransaction = await this.budgetModel

      .findByIdAndUpdate(id, updateBudgetDto, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      })
      .exec();

    if (!updatedTransaction) {
      throw new NotFoundException(`Budget with ID ${id} not found`);
    }

    return updatedTransaction;
  }

  // 🔹 Delete Budget by ID
  async remove(user: UserJWTResponse, id: string): Promise<Budget> {
    const budget = await this.budgetModel.findById(id);
    validateOwnership(user._id, budget, 'Budget');
    if (!budget) {
      throw new NotFoundException(`Budget with ID ${id} not found`);
    }

    await this.budgetModel.findByIdAndDelete(id);
    return budget;
  }

  // 🔹 Delete All Budgets
  async removeAll(): Promise<boolean> {
    const result = await this.budgetModel.deleteMany({});
    return result.deletedCount > 0;
  }

  // 🔹 Delete All Budgets by User ID
  async deleteAllByUserId(userId: string): Promise<boolean> {
    const result = await this.budgetModel.deleteMany({
      userId: new Types.ObjectId(userId),
    });
    return result.deletedCount > 0;
  }

  async getBudgetWithSpentAmountForDashboard(
    userId: string,
    month: string,
    limit: number,
  ): Promise<any[]> {
    const [year, monthNum] = month.split('-').map(Number);

    const startDate = new Date(Date.UTC(year, monthNum - 1, 1));
    const endDate = new Date(Date.UTC(year, monthNum, 1));

    return this.budgetModel.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId),
          startDate: { $gte: startDate, $lt: endDate }, // filter by month
        },
      },
      {
        $lookup: {
          from: 'transactions',
          let: { category: '$category' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$category', '$$category'] },
                    { $eq: ['$type', 'Expense'] },
                    { $gte: ['$date', startDate] },
                    { $lt: ['$date', endDate] },
                  ],
                },
              },
            },
          ],
          as: 'transactions',
        },
      },
      {
        $addFields: {
          spent: { $sum: '$transactions.amount' },
          remaining: {
            $subtract: ['$monthlyLimit', { $sum: '$transactions.amount' }],
          },
          usedPercentage: {
            $multiply: [
              { $divide: [{ $sum: '$transactions.amount' }, '$monthlyLimit'] },
              100,
            ],
          },
        },
      },
      {
        $project: {
          id: '$_id',
          userId: 1,
          name: 1,
          category: 1,
          monthlyLimit: 1,
          spent: 1,
          remaining: 1,
          usedPercentage: 1,
          startDate: 1,
          endDate: 1,
          _id: 0,
        },
      },
      { $sort: { startDate: -1 } },
      { $limit: limit },
    ]);
  }

  async getBudgetWithSpentAmount(
    userId: string,
    search: string,
    skip: number,
    take: number,
    startDate?: string,
    endDate?: string,
    order: SortOrder = SortOrder.ASC,
    sortBy: string = 'createdAt',
  ): Promise<{ data: any[]; totalPages: number }> {
    const match: any = { userId: new Types.ObjectId(userId) };

    if (search) {
      match.$or = [
        { name: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    if (startDate && endDate) {
      match.startDate = { $gte: new Date(startDate) };
      match.endDate = { $lte: new Date(endDate) };
    }

    const totalBudgets = await this.budgetModel.countDocuments(match);

    const pipeline: any[] = [
      { $match: match },
      { $sort: { [sortBy]: order === 'ASC'.toLowerCase() ? 1 : -1 } },
    ];

    if (take !== -1) {
      pipeline.push({ $skip: skip });
      pipeline.push({ $limit: take });
    }

    pipeline.push(
      {
        $lookup: {
          from: 'transactions',
          let: { category: '$category' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$category', '$$category'] },
                    { $eq: ['$type', 'Expense'] },
                  ],
                },
              },
            },
          ],
          as: 'transactions',
        },
      },
      {
        $addFields: {
          spent: { $sum: '$transactions.amount' },
          remaining: {
            $subtract: ['$monthlyLimit', { $sum: '$transactions.amount' }],
          },
          usedPercentage: {
            $multiply: [
              { $divide: [{ $sum: '$transactions.amount' }, '$monthlyLimit'] },
              100,
            ],
          },
        },
      },
      {
        $project: {
          id: '$_id',
          name: 1,
          category: 1,
          monthlyLimit: 1,
          spent: 1,
          remaining: 1,
          usedPercentage: 1,
          startDate: 1,
          endDate: 1,
          _id: 0,
        },
      },
    );

    const data = await this.budgetModel.aggregate(pipeline);

    return {
      data,
      totalPages: take === -1 ? 1 : Math.ceil(totalBudgets / take),
    };
  }

  async getBudgetWithSpentAmountWithCategoryAndDate(
    userId: string,
    category: string,
    date: string,
  ): Promise<any | null> {
    const transactionDate = new Date(date);

    const result = await this.budgetModel.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId),
          category,
          startDate: { $lte: transactionDate }, // Budget should start before transaction
          endDate: { $gte: transactionDate }, // Budget should end after transaction
        },
      },
      {
        $lookup: {
          from: 'transactions', // Transactions collection
          let: {
            budgetCategory: '$category',
            budgetStart: '$startDate',
            budgetEnd: '$endDate',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$category', '$$budgetCategory'] }, // Match category
                    { $eq: ['$type', 'Expense'] }, // ✅ Only count expenses
                    { $gte: ['$date', '$$budgetStart'] }, // ✅ Only transactions within budget period
                    { $lte: ['$date', '$$budgetEnd'] },
                  ],
                },
              },
            },
          ],
          as: 'transactions',
        },
      },
      {
        $addFields: {
          spent: { $sum: '$transactions.amount' }, // ✅ Sum all expense transactions
          remaining: {
            $subtract: ['$monthlyLimit', { $sum: '$transactions.amount' }],
          }, // ✅ Remaining budget
          usedPercentage: {
            $multiply: [
              { $divide: [{ $sum: '$transactions.amount' }, '$monthlyLimit'] },
              100,
            ],
          },
          startDateFormatted: {
            $dateToString: { format: '%Y-%m-%d', date: '$startDate' },
          },
          endDateFormatted: {
            $dateToString: { format: '%Y-%m-%d', date: '$endDate' },
          },
        },
      },
      {
        $project: {
          id: '$_id',
          userId: 1,
          name: 1,
          category: 1,
          monthlyLimit: 1,
          spent: 1,
          remaining: 1,
          usedPercentage: { $min: [100, '$usedPercentage'] }, // ✅ Cap at 100%
          startDate: '$startDateFormatted', // ✅ Use formatted date
          endDate: '$endDateFormatted', // ✅ Use formatted date
          _id: 0, // Remove `_id`
        },
      },
    ]);

    return result.length > 0 ? result[0] : null;
  }

  async getTotalBudget(userId: string): Promise<any> {
    const currentMonthStart = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1,
    );
    const currentMonthEnd = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0,
    );

    // 🔹 Step 1: Find Active Budgets
    const activeBudgets = await this.budgetModel.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId),
          startDate: { $lte: currentMonthEnd }, // Budget must be active before month-end
          endDate: { $gte: currentMonthStart }, // Budget must be active after month-start
        },
      },
      {
        $group: {
          _id: null,
          totalBudget: { $sum: '$monthlyLimit' }, // Total budget sum
          budgetCount: { $sum: 1 }, // Count of active budgets
          activeCategories: { $addToSet: '$category' }, // ✅ Store active categories
        },
      },
    ]);

    // 🔹 Step 2: Extract active categories (if budgets exist)
    const activeCategories =
      activeBudgets.length > 0 ? activeBudgets[0].activeCategories : [];

    // 🔹 Step 3: Fetch transactions that match the active budget categories
    const transactionAggregation = await this.transactionModel.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId),
          type: 'Expense', // ✅ Only consider expenses
          category: { $in: activeCategories }, // ✅ Match only active budget categories
          date: { $gte: currentMonthStart, $lte: currentMonthEnd }, // ✅ Transactions within the month
        },
      },
      {
        $group: {
          _id: null,
          totalSpent: { $sum: '$amount' }, // ✅ Sum all transactions in active budgets
        },
      },
    ]);

    return {
      totalBudget: activeBudgets.length > 0 ? activeBudgets[0].totalBudget : 0,
      totalSpent:
        transactionAggregation.length > 0
          ? transactionAggregation[0].totalSpent
          : 0,
      budgetCount: activeBudgets.length > 0 ? activeBudgets[0].budgetCount : 0,
    };
  }

  async getTotalExpensesByCategory(
    userId: string,
    category: string,
    startDate: string,
    endDate: string,
  ): Promise<number> {
    const result = await this.transactionModel.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId),
          category: category,
          type: 'Expense', // ✅ Only count expenses
          date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSpent: { $sum: '$amount' }, // Sum all amounts
        },
      },
    ]);

    return result.length > 0 ? result[0].totalSpent : 0;
  }

  async getBudgetByCategoryAndDate(
    userId: string,
    category: string,
    date: string,
  ): Promise<Budget | null> {
    const transactionDate = new Date(date); // Convert to Date object

    return await this.budgetModel.findOne({
      userId: new Types.ObjectId(userId),
      category,
      startDate: { $lte: transactionDate }, // Budget should start before transaction
      endDate: { $gte: transactionDate }, // Budget should end after transaction
    });
  }
}
