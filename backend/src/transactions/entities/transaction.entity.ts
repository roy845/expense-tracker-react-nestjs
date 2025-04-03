import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Document, Types } from 'mongoose';
import {
  Category,
  PaymentMethod,
  TransactionType,
} from '../constants/transactions-constants';

@Schema({ timestamps: true, versionKey: false })
@ObjectType()
export class Transaction extends Document {
  @Field(() => ID)
  _id: string;

  @Field(() => Float)
  @Prop({ required: true })
  amount: number;

  @Field(() => TransactionType)
  @Prop({ required: true, enum: TransactionType })
  type: TransactionType;

  @Field({ nullable: true })
  @Prop()
  description?: string;

  @Field(() => Category)
  @Prop({ required: true, enum: Category })
  category: Category;

  @Field()
  @Prop({ required: true, type: Date })
  date: Date;

  @Field(() => PaymentMethod)
  @Prop({ required: true, enum: PaymentMethod })
  paymentMethod: PaymentMethod;

  @Field(() => Boolean)
  @Prop({ default: false })
  recurringTransaction: boolean;

  @Field(() => [String], { nullable: true })
  @Prop({ type: [String], default: [] })
  tags?: string[];

  @Field(() => ID) // Store only the User ID
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
