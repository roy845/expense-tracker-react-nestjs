import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { TransactionService } from './transactions.service';
import { ObjectIdValidationPipe } from 'src/pipes/object-id-validation.pipe';
import { SearchArgs } from 'src/common/searchArgs';
import { PaginationArgs } from 'src/common/paginationArgs';
import { SortArgs } from 'src/common/sortArgs';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/guards/authorization.guard';
import { UserRoles } from 'src/auth/roles/user-roles.enum';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { User } from 'src/decorators/user.decorator';
import { UserJWTResponse } from 'src/auth/types/jwt.types';
import { TransactionListResponse } from './types/transaction.types';
import { TransactionFilterArgs } from './dto/transaction-filter.args';

@Resolver(() => Transaction)
export class TransactionsResolver {
  constructor(private readonly transactionsService: TransactionService) {}

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.USER)
  @Mutation(() => Transaction)
  createTransaction(
    @User() user: UserJWTResponse,
    @Args('createTransactionInput')
    createTransactionInput: CreateTransactionInput,
  ) {
    return this.transactionsService.create(user, createTransactionInput);
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  @Query(() => [Transaction], { name: 'transactions' })
  findAll(
    @Args() searchArgs: SearchArgs,
    @Args() paginationArgs: PaginationArgs,
    @Args() sortArgs: SortArgs,
  ) {
    return this.transactionsService.findAll(
      searchArgs,
      paginationArgs,
      sortArgs,
    );
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.USER)
  @Query(() => Transaction, { name: 'transaction' })
  findOne(
    @User() user: UserJWTResponse,
    @Args('id', { type: () => String }, ObjectIdValidationPipe) id: string,
  ) {
    return this.transactionsService.findOne(user, id);
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.USER)
  @Query(() => TransactionListResponse)
  async transactionsByUser(
    @User() user: UserJWTResponse,
    @Args() searchArgs: SearchArgs,
    @Args() paginationArgs: PaginationArgs,
    @Args() sortArgs: SortArgs,
    @Args() filterArgs: TransactionFilterArgs,
  ): Promise<TransactionListResponse> {
    return this.transactionsService.findByUser(
      user,
      searchArgs,
      paginationArgs,
      sortArgs,
      filterArgs,
    );
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.USER)
  @Mutation(() => Transaction)
  updateTransaction(
    @User() user: UserJWTResponse,
    @Args('id', { type: () => String }, ObjectIdValidationPipe) id: string,
    @Args('updateTransactionInput')
    updateTransactionInput: UpdateTransactionInput,
  ) {
    return this.transactionsService.update(id, user, updateTransactionInput);
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.USER)
  @Mutation(() => Transaction)
  removeTransaction(
    @User() user: UserJWTResponse,
    @Args('id', { type: () => String }, ObjectIdValidationPipe) id: string,
  ) {
    return this.transactionsService.remove(user, id);
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.USER)
  @Mutation(() => Boolean)
  async removeTransactions(): Promise<boolean> {
    return this.transactionsService.removeAllTransactions();
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.USER)
  @Mutation(() => Boolean)
  async removeAllTransactionsByUser(
    @User() user: UserJWTResponse,
  ): Promise<boolean> {
    return this.transactionsService.removeAllTransactionsByUser(user);
  }
}
