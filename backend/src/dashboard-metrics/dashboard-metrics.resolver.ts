import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { DashboardMetricsService } from './dashboard-metrics.service';
import { DashboardMetric } from './entities/dashboard-metric.entity';
import { UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { RolesGuard } from 'src/auth/guards/authorization.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { UserRoles } from 'src/auth/roles/user-roles.enum';
import { UserJWTResponse } from 'src/auth/types/jwt.types';
import { DashboardMetrics } from './dto/dashboard-metrics.dto';
import { User } from 'src/decorators/user.decorator';
import { ExpenseByCategoryResponse } from './dto/expense-category.dto';
import { ExpenseTrendsResponse } from './dto/expense-trends.dto';
import { RecentTransactionsResponse } from './dto/recent-transactions.dto';
import { IncomeSource } from './dto/income-source.dto';
import { IncomeVsExpenses } from './dto/income-vs-expenses.dto';

@Resolver(() => DashboardMetric)
export class DashboardMetricsResolver {
  constructor(
    private readonly dashboardMetricsService: DashboardMetricsService,
  ) {}

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.USER)
  @Query(() => DashboardMetrics, { name: 'getDashboardMetrics' })
  getDashboardMetrics(@User() user: UserJWTResponse) {
    return this.dashboardMetricsService.getDashboardMetrics(user._id);
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.USER)
  @Query(() => ExpenseByCategoryResponse, { name: 'getExpenseByCategory' })
  async getExpenseByCategory(
    @User() user: UserJWTResponse,
    @Args('month', { type: () => String }) month: string,
  ) {
    const expenseByCategoryPerMonth =
      await this.dashboardMetricsService.getExpenseByCategory(user._id, month);

    return expenseByCategoryPerMonth;
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.USER)
  @Query(() => ExpenseTrendsResponse, { name: 'getExpenseTrends' })
  getExpenseTrends(
    @User() user: UserJWTResponse,
    @Args('days', { type: () => Int }) days: number,
  ) {
    return this.dashboardMetricsService.getExpenseTrends(user._id, days);
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.USER)
  @Query(() => RecentTransactionsResponse, { name: 'getRecentTransactions' })
  async getRecentTransactions(
    @User() user: UserJWTResponse,
    @Args('limit', { type: () => Int }) limit: number,
  ): Promise<RecentTransactionsResponse> {
    return this.dashboardMetricsService.getRecentTransactions(user._id, limit);
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.USER)
  @Query(() => [IncomeSource], { name: 'getIncomeSources' })
  async getIncomeSources(
    @User() user: UserJWTResponse,
    @Args('month', { type: () => String }) month: string,
  ): Promise<IncomeSource[]> {
    return this.dashboardMetricsService.getIncomeSources(user._id, month);
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.USER)
  @Query(() => [IncomeVsExpenses], { name: 'getIncomeVsExpenses' })
  async getIncomeVsExpenses(
    @User() user: UserJWTResponse,
    @Args('month', { type: () => String }) month: string,
  ): Promise<IncomeVsExpenses[]> {
    return this.dashboardMetricsService.getIncomeVsExpenses(user._id, month);
  }
}
