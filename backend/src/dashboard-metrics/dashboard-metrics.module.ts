import { Module } from '@nestjs/common';
import { DashboardMetricsService } from './dashboard-metrics.service';
import { DashboardMetricsResolver } from './dashboard-metrics.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Transaction,
  TransactionSchema,
} from 'src/transactions/entities/transaction.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  providers: [DashboardMetricsResolver, DashboardMetricsService],
})
export class DashboardMetricsModule {}
