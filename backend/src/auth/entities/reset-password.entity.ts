import { Prop, Schema } from '@nestjs/mongoose';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Schema({ timestamps: true })
export class ResetPassword {
  @Field()
  @Prop({ required: false, default: '' })
  token: string;

  @Field()
  @Prop({ required: false, default: new Date() })
  expiresAt: Date;
}
