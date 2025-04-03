import { InputType, Field, Float } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { Category } from 'src/transactions/constants/transactions-constants';

@InputType()
export class CreateBudgetInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsEnum(Category)
  category: string;

  @Field(() => Float)
  @IsNumber()
  monthlyLimit: number;

  @Field(() => Date)
  @IsDate()
  startDate: Date;

  @Field(() => Date)
  @IsDate()
  endDate: Date;
}
