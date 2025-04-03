import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteAllUsersResponse {
  @Field(() => Int)
  deletedUsers: number;
  @Field(() => Int)
  deletedTransactions: number;
  @Field(() => Int)
  deletedBudgets: number;
}
