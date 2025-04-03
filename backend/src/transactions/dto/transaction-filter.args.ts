import { ArgsType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import {
  Category,
  PaymentMethod,
  TransactionType,
} from '../constants/transactions-constants';
import { IsNumber, IsOptional, Min } from 'class-validator';

@ArgsType()
export class TransactionFilterArgs {
  @Field(() => TransactionType, { nullable: true })
  type?: TransactionType;

  @Field(() => Category, { nullable: true })
  category?: Category;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  startDate?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  endDate?: Date;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minAmount?: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxAmount?: number;

  @Field(() => PaymentMethod, { nullable: true })
  paymentMethod?: PaymentMethod;
}
