import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserRoles } from 'src/auth/roles/user-roles.enum';

export type RoleDocument = Role & Document;

@ObjectType()
@Schema({ timestamps: true, versionKey: false })
export class Role {
  @Field(() => ID)
  _id: string;

  @Field(() => UserRoles)
  @Prop({
    type: String,
    enum: Object.values(UserRoles),
    required: true,
    unique: true,
  })
  name: UserRoles;

  @Field(() => Date)
  @Prop()
  createdAt: Date;

  @Field(() => Date)
  @Prop()
  updatedAt: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
