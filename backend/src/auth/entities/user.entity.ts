import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { UserRoles } from '../roles/user-roles.enum';
import { AuthEnum } from '../constants/auth-constants';
import { ResetPassword } from './reset-password.entity';
import { Bio } from './bio.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

export type UserDocument = User &
  Document & {
    comparePassword: (password: string) => Promise<boolean>;
  };

@ObjectType()
@Schema({ timestamps: true, versionKey: false })
export class User {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true, unique: true })
  username: string;

  @Field()
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Field(() => [UserRoles])
  @Prop({
    type: [String],
    enum: Object.values(UserRoles),
    default: [UserRoles.USER],
  })
  roles: UserRoles[];

  @Field(() => ResetPassword, { nullable: true })
  @Prop({
    type: ResetPassword,
    required: false,
    default: () => ({}),
  })
  resetPassword?: ResetPassword;

  @Field({ nullable: true })
  @Prop({ required: false })
  refreshToken?: string;

  @Field(() => Bio)
  @Prop({ type: Bio, default: () => ({}) })
  bio: Bio;

  @Field({ nullable: true })
  @Prop({ required: false, default: '$' }) // Default to USD
  currencySymbol?: string;

  @Field(() => Date)
  @Prop()
  createdAt: Date;

  @Field(() => Date)
  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Pre-save hook for password hashing
UserSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, AuthEnum.SALT_ROUNDS);
  next();
});

/**
 * **Pre-save hook for reset token cleanup**
 */
UserSchema.pre<UserDocument>('save', async function (next) {
  if (this.resetPassword && this.resetPassword.expiresAt) {
    const now = new Date();
    if (this.resetPassword.expiresAt < now) {
      this.resetPassword = undefined;
    }
  }
  next();
});

// Pre-update hook for `updatedAt`
UserSchema.pre<UserDocument>('findOneAndUpdate', function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

// Method to validate password
UserSchema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};
