import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/auth/entities/user.entity';

@ObjectType()
export class UserResponse {
  @Field(() => [User])
  users: User[];

  @Field(() => Int)
  totalPages: number;
}
