import { InputType, Field } from '@nestjs/graphql';
import { UserRoles } from 'src/auth/roles/user-roles.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateRoleInput {
  @Field(() => UserRoles)
  @IsEnum(UserRoles)
  @IsNotEmpty()
  name: UserRoles;
}
