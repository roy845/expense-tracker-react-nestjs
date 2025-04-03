import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Role } from '../entities/role.entity';

@ObjectType()
export class RolesResponse {
  @Field(() => [Role])
  roles: Role[];

  @Field(() => Int)
  totalPages: number;
}
