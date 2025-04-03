import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/auth/entities/user.entity';
import { PaginationArgs } from 'src/common/paginationArgs';
import { SearchArgs } from 'src/common/searchArgs';
import { SortArgs } from 'src/common/sortArgs';
import { UpdateUserInput } from './dto/update-user.input';
import { AuthEnum } from 'src/auth/constants/auth-constants';
import * as bcrypt from 'bcryptjs';
import { UserFilterArgs } from './dto/user-filter.args';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { Budget, BudgetDocument } from 'src/budget/entities/budget.entity';
import { DeleteAllUsersResponse } from './dto/delete-result.dto';
import {
  getPermissionsByUserId,
  updatePermissionsFileForUser,
} from 'src/permissions/permissions.utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,
    @InjectModel(Budget.name) private budgetModel: Model<BudgetDocument>,
  ) {}

  async findAll(
    searchArgs: SearchArgs,
    paginationArgs: PaginationArgs,
    sortArgs: SortArgs,
    filterArgs: UserFilterArgs,
  ) {
    const { search } = searchArgs;
    const { skip = 0, take = -1 } = paginationArgs;
    const { sortBy = 'createdAt', order = 'asc' } = sortArgs;
    const { startDate, endDate } = filterArgs;

    const filter: Record<string, any> = {};

    if (search) {
      filter.$or = [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) {
        filter.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.createdAt.$lte = new Date(endDate);
      }
    }

    const totalUsers = await this.userModel.countDocuments(filter);

    // 🔹 If `take` is -1, fetch all records (ignore pagination)
    let usersQuery = this.userModel.find(filter).sort({ [sortBy]: order });

    if (take !== -1) {
      usersQuery = usersQuery.skip(skip).limit(take);
    }

    const users = await usersQuery.exec();

    return {
      users,
      totalPages: take === -1 ? 1 : Math.ceil(totalUsers / take),
    };
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (updateUserInput.password) {
      updateUserInput.password = await bcrypt.hash(
        updateUserInput.password,
        AuthEnum.SALT_ROUNDS,
      );
    }

    return await this.userModel.findByIdAndUpdate(id, updateUserInput, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  }

  async remove(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Remove user's transactions and budgets
    await this.transactionModel.deleteMany({ userId: id });
    await this.budgetModel.deleteMany({ userId: id });
    return await this.userModel.findByIdAndDelete(id);
  }

  async removeAllUsers(): Promise<DeleteAllUsersResponse> {
    const deletedUsersResult = await this.userModel.deleteMany({});
    const deletedTransactionsResult = await this.transactionModel.deleteMany(
      {},
    );
    const deletedBudgetsResult = await this.budgetModel.deleteMany({});

    return {
      deletedUsers: deletedUsersResult.deletedCount || 0,
      deletedTransactions: deletedTransactionsResult.deletedCount || 0,
      deletedBudgets: deletedBudgetsResult.deletedCount || 0,
    };
  }

  async updateCurrencySymbol(userId: string, currencySymbol: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    user.currencySymbol = currencySymbol;
    await user.save();
    return user;
  }

  async getCurrencySymbol(userId: string): Promise<string> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user.currencySymbol || '$'; // Default to USD if not set
  }

  async getUserPermissions(userId: string): Promise<string[]> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const permissions = getPermissionsByUserId(userId);
    if (!permissions) {
      throw new NotFoundException(
        `No permissions found for user ${user.username}`,
      );
    }

    return permissions;
  }

  async updateUserPermissions(
    userId: string,
    permissions: string[],
  ): Promise<string[]> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    updatePermissionsFileForUser(userId, permissions);
    return permissions;
  }
}
