import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { BudgetService } from './budget.service';
import { CreateBudgetInput } from './dto/create-budget.input';
import { UpdateBudgetInput } from './dto/update-budget.input';
import { UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { User } from '../decorators/user.decorator';
import { UserJWTResponse } from '../auth/types/jwt.types';
import { ObjectIdValidationPipe } from 'src/pipes/object-id-validation.pipe';
import { Budget } from './entities/budget.entity';
import { SearchArgs } from 'src/common/searchArgs';
import { PaginationArgs } from 'src/common/paginationArgs';
import { SortArgs } from 'src/common/sortArgs';
import { RolesGuard } from 'src/auth/guards/authorization.guard';
import { UserRoles } from 'src/auth/roles/user-roles.enum';
import { Roles } from 'src/auth/roles/roles.decorator';
import { BudgetResponse } from './dto/budget-response.dto';
import { TotalBudgetResponse } from './dto/total-budget-response.dto';
import { BudgetFilterArgs } from './dto/budget-filter-args.dto';
import { PaginatedBudgetResponse } from './dto/paginated-budget-response.dto';
import { SortOrder } from 'src/common/sort-order.enum';

@Resolver(() => Budget)
export class BudgetResolver {
  constructor(private readonly budgetService: BudgetService) {}

  // 🔹 Create Budget
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.USER)
  @Mutation(() => Budget)
  createBudget(
    @User() user: UserJWTResponse,
    @Args('input') input: CreateBudgetInput,
  ) {
    return this.budgetService.create(user._id, input);
  }

  // 🔹 Get All Budgets
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  @Query(() => [Budget])
  findAllBudgets(
    @Args() searchArgs: SearchArgs,
    @Args() paginationArgs: PaginationArgs,
    @Args() sortArgs: SortArgs,
  ) {
    return this.budgetService.findAll(searchArgs, paginationArgs, sortArgs);
  }

  // 🔹 Get Budget by ID
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.USER)
  @Query(() => Budget)
  findBudget(
    @Args('id', { type: () => String }) id: string,
    @User() user: UserJWTResponse,
  ) {
    return this.budgetService.findOne(user, id);
  }

  // 🔹 Get Budgets by User ID
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.USER)
  @Query(() => [Budget])
  findBudgetsByUser(@User() user: UserJWTResponse) {
    return this.budgetService.findByUserId(user._id);
  }

  // 🔹 Update Budget
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.USER)
  @UseGuards(AccessTokenGuard)
  @Mutation(() => Budget)
  updateBudget(
    @User() user: UserJWTResponse,
    @Args('input') input: UpdateBudgetInput,
    @Args('id', { type: () => String }, ObjectIdValidationPipe) id: string,
  ) {
    return this.budgetService.update(id, user, input);
  }

  // 🔹 Delete Budget by ID
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.USER)
  @Mutation(() => Budget)
  removeBudget(
    @User() user: UserJWTResponse,
    @Args('id', { type: () => String }, ObjectIdValidationPipe) id: string,
  ) {
    return this.budgetService.remove(user, id);
  }

  // 🔹 Delete All Budgets
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  @Mutation(() => Boolean)
  removeAllBudgets() {
    return this.budgetService.removeAll();
  }

  // 🔹 Delete All Budgets by User ID
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.USER)
  @Mutation(() => Boolean)
  deleteAllBudgetsByUser(@User() user: UserJWTResponse) {
    return this.budgetService.deleteAllByUserId(user._id);
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.USER)
  @Query(() => [BudgetResponse])
  async getBudgetWithSpentAmountForDashboard(
    @User() user: UserJWTResponse,
    @Args('month', { type: () => String }) month: string,
    @Args('limit', { type: () => Number, defaultValue: 5 }) limit: number,
  ): Promise<BudgetResponse[]> {
    const budgets =
      await this.budgetService.getBudgetWithSpentAmountForDashboard(
        user._id,
        month,
        limit,
      );

    return budgets.map((budget) => {
      const parsedStartDate = new Date(Number(budget.startDate));
      const parsedEndDate = new Date(Number(budget.endDate));

      return {
        id: budget.id,
        userId: budget.userId,
        name: budget.name,
        category: budget.category,
        monthlyLimit: budget.monthlyLimit,
        spent: budget.spent || 0,
        remaining: budget.remaining || budget.monthlyLimit,
        usedPercentage: budget.usedPercentage || 0,
        startDate: isNaN(parsedStartDate.getTime())
          ? ''
          : parsedStartDate.toISOString(),
        endDate: isNaN(parsedEndDate.getTime())
          ? ''
          : parsedEndDate.toISOString(),
      };
    });
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.USER)
  @Query(() => PaginatedBudgetResponse)
  async findBudgetsWithSpent(
    @User() user: UserJWTResponse,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
    @Args() sortArgs: SortArgs,
    @Args() filterArgs: BudgetFilterArgs,
  ): Promise<PaginatedBudgetResponse> {
    const { skip = 0, take = -1 } = paginationArgs;
    const { search = '' } = searchArgs;
    const { startDate, endDate } = filterArgs;
    const { order = SortOrder.ASC, sortBy } = sortArgs;

    const result = await this.budgetService.getBudgetWithSpentAmount(
      user._id,
      search,
      skip,
      take,
      startDate,
      endDate,
      order,
      sortBy,
    );

    return {
      budgets: result.data.map((budget) => ({
        id: budget.id,
        userId: budget.userId,
        name: budget.name,
        category: budget.category,
        monthlyLimit: budget.monthlyLimit,
        spent: budget.spent || 0,
        remaining: budget.remaining || budget.monthlyLimit,
        usedPercentage: budget.usedPercentage || 0,
        startDate: budget.startDate?.toISOString?.() || '',
        endDate: budget.endDate?.toISOString?.() || '',
      })),
      totalPages: result.totalPages,
    };
  }

  @UseGuards(AccessTokenGuard)
  @Query(() => TotalBudgetResponse)
  async getTotalBudget(@User() user: UserJWTResponse) {
    const totalBudget = await this.budgetService.getTotalBudget(user._id);

    return totalBudget;
  }

  @UseGuards(AccessTokenGuard)
  @Query(() => Number)
  async getTotalExpensesByCategory(
    @User() user: UserJWTResponse,
    @Args('category') category: string,
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
  ): Promise<number> {
    return this.budgetService.getTotalExpensesByCategory(
      user._id,
      category,
      startDate,
      endDate,
    );
  }

  @UseGuards(AccessTokenGuard)
  @Query(() => BudgetResponse, { nullable: true })
  async getBudgetWithSpentAmount(
    @User() user: UserJWTResponse,
    @Args('category') category: string,
    @Args('date') date: string,
  ): Promise<any | null> {
    const budget =
      await this.budgetService.getBudgetWithSpentAmountWithCategoryAndDate(
        user._id,
        category,
        date,
      );

    return budget;
  }
}
