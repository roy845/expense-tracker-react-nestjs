import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, Types } from 'mongoose';

import { CreateTransactionInput } from './dto/create-transaction.input';
import { Transaction } from './entities/transaction.entity';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { SearchArgs } from 'src/common/searchArgs';
import { PaginationArgs } from 'src/common/paginationArgs';
import { SortArgs } from 'src/common/sortArgs';
import { UserJWTResponse } from 'src/auth/types/jwt.types';
import { validateOwnership } from '../common/utils/validateOwnership';
import { TransactionFilterArgs } from './dto/transaction-filter.args';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,
  ) {}

  async findAll(
    searchArgs: SearchArgs,
    paginationArgs: PaginationArgs,
    sortArgs: SortArgs,
  ): Promise<Transaction[]> {
    const { search } = searchArgs;
    const { skip, take } = paginationArgs;
    const { sortBy = 'createdAt', order = 'asc' } = sortArgs;

    const filter = search
      ? {
          $or: [{ description: { $regex: search, $options: 'i' } }],
        }
      : {};

    return await this.transactionModel
      .find(filter)
      .sort({ [sortBy]: order })
      .skip((skip as number) - 1)
      .limit(take as number);
  }

  async findOne(user: UserJWTResponse, id: string): Promise<Transaction> {
    const transaction = await this.transactionModel.findById(id).exec();

    validateOwnership(user._id, transaction, 'Transaction');

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    return transaction;
  }

  async findByUser(
    user: UserJWTResponse,
    searchArgs: SearchArgs,
    paginationArgs: PaginationArgs,
    sortArgs: SortArgs,
    filterArgs: TransactionFilterArgs,
  ): Promise<{ transactions: Transaction[]; totalPages: number }> {
    const { search } = searchArgs;
    const { skip = 0, take = -1 } = paginationArgs;
    const { sortBy = 'createdAt', order = 'desc' } = sortArgs;
    const {
      type,
      category,
      startDate,
      endDate,
      minAmount,
      maxAmount,
      paymentMethod,
    } = filterArgs;

    const filter: Record<string, any> = {
      userId: new Types.ObjectId(user._id),
    };

    // 🔹 Search by description
    if (search) {
      filter.$or = [{ description: { $regex: search, $options: 'i' } }];
    }

    // 🔹 Filter by transaction type
    if (type && ['INCOME', 'EXPENSE'].includes(type.toUpperCase())) {
      filter.type = type;
    }

    // 🔹 Filter by category
    if (category) {
      filter.category = category;
    }

    // 🔹 Filter by date range
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) {
        filter.date.$gte = new Date(startDate).toISOString().split('T')[0];
      }
      if (endDate) {
        filter.date.$lte = new Date(endDate).toISOString().split('T')[0];
      }
    }

    // 🔹 Filter by amount range
    if (minAmount !== undefined || maxAmount !== undefined) {
      filter.amount = {};
      if (minAmount !== undefined) {
        filter.amount.$gte = minAmount;
      }
      if (maxAmount !== undefined) {
        filter.amount.$lte = maxAmount;
      }
    }

    if (paymentMethod) {
      filter.paymentMethod = paymentMethod;
    }

    // 🔹 Get total count of transactions matching criteria
    const totalTransactions =
      await this.transactionModel.countDocuments(filter);

    // 🔹 If `take` is -1, fetch all records (ignore pagination)
    let transactionsQuery = this.transactionModel
      .find(filter)
      .sort({ [sortBy]: order.toLowerCase() === 'asc' ? 1 : -1 });

    if (take !== -1) {
      transactionsQuery = transactionsQuery.skip(skip).limit(take);
    }

    const transactions = await transactionsQuery.exec();

    return {
      transactions,
      totalPages: take === -1 ? 1 : Math.ceil(totalTransactions / take),
    };
  }

  async update(
    id: string,
    user: UserJWTResponse,
    updateData: UpdateTransactionInput,
  ): Promise<Transaction> {
    const transaction = await this.transactionModel.findById(id).exec();
    validateOwnership(user._id, transaction, 'Transaction');

    const updatedTransaction = await this.transactionModel

      .findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      })
      .exec();

    if (!updatedTransaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    return updatedTransaction;
  }

  async create(
    user: UserJWTResponse,
    input: CreateTransactionInput,
  ): Promise<Transaction> {
    if (!isValidObjectId(user._id)) {
      throw new BadRequestException(`Invalid userId: ${user._id}`);
    }
    const formattedDate = new Date(input.date); // ✅ Ensure Date format

    const newTransaction = new this.transactionModel({
      ...input,
      userId: user._id,
      date: formattedDate, // ✅ Store as Date object
    });
    return newTransaction.save();
  }

  async remove(user: UserJWTResponse, id: string): Promise<Transaction> {
    const transaction = await this.transactionModel.findById(id);
    validateOwnership(user._id, transaction, 'Transaction');
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    await this.transactionModel.findByIdAndDelete(id);
    return transaction;
  }

  async removeAllTransactionsByUser(user: UserJWTResponse): Promise<boolean> {
    try {
      const result = await this.transactionModel.deleteMany({
        userId: user._id,
      });
      return result.deletedCount > 0;
    } catch (error) {
      throw new BadRequestException('Failed to delete all transactions');
    }
  }

  async removeAllTransactions(): Promise<boolean> {
    try {
      const result = await this.transactionModel.deleteMany({});
      return result.deletedCount > 0;
    } catch (error) {
      throw new BadRequestException('Failed to delete all transactions');
    }
  }
}
