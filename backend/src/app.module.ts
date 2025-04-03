import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from './config/env.validation';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { MailModule } from './mail/mail.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MailService } from './mail/mail.service';
import { UsersModule } from './users/users.module';
import { DatabaseSeeder } from 'src/seeders/database-seeder.service';
import { User, UserSchema } from './auth/entities/user.entity';
import { RolesModule } from './roles/roles.module';
import { Role, RoleSchema } from './roles/entities/role.entity';
import { TransactionsModule } from './transactions/transactions.module';
import { BudgetModule } from './budget/budget.module';
import { DashboardMetricsModule } from './dashboard-metrics/dashboard-metrics.module';
import { ReceiptModule } from './receipt/receipt.module';
import { DatabaseTransactionsBudgetsSeeder } from './seeders/transactions-budgets.service';
import {
  Transaction,
  TransactionSchema,
} from './transactions/entities/transaction.entity';
import { Budget, BudgetSchema } from './budget/entities/budget.entity';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: 'schema.gql',
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      debug: true,
      driver: ApolloDriver,
      context: ({ req, res }) => ({ req, res }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    MailModule,
    UsersModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    MongooseModule.forFeature([{ name: Budget.name, schema: BudgetSchema }]),
    RolesModule,
    TransactionsModule,
    BudgetModule,
    DashboardMetricsModule,
    ReceiptModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src/build'),
    }),
  ],
  controllers: [AppController],
  providers: [
    DatabaseSeeder,
    // DatabaseTransactionsBudgetsSeeder,
    AppService,
    MailService,
  ],
})
export class AppModule {}
