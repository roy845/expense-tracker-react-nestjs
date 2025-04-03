import { ObjectType, Field, Float, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from 'src/transactions/constants/transactions-constants';

export type BudgetDocument = Budget & Document;

@Schema({ timestamps: true, versionKey: false })
@ObjectType()
export class Budget {
  @Field(() => ID)
  _id: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  @Field(() => ID)
  userId: Types.ObjectId;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({
    required: true,
    enum: Category,
  })
  @Field()
  category: string;

  @Prop({ required: true, min: 0 })
  @Field(() => Float)
  monthlyLimit: number;

  @Prop({ required: true })
  @Field(() => Date)
  startDate: Date;

  @Prop({ required: true })
  @Field(() => Date)
  endDate: Date;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

export const BudgetSchema = SchemaFactory.createForClass(Budget);
