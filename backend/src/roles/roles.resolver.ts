import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { UserRoles } from 'src/auth/roles/user-roles.enum';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/guards/authorization.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { SearchArgs } from 'src/common/searchArgs';
import { PaginationArgs } from 'src/common/paginationArgs';
import { SortArgs } from 'src/common/sortArgs';
import { RolesResponse } from './dto/roles.response.dto';
import { User } from 'src/auth/entities/user.entity';

@Resolver(() => Role)
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(UserRoles.ADMIN)
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Mutation(() => Role)
  async createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    return await this.rolesService.create(createRoleInput);
  }

  @Query(() => RolesResponse, { name: 'roles' })
  async findAll(
    @Args() searchArgs: SearchArgs,
    @Args() paginationArgs: PaginationArgs,
    @Args() sortArgs: SortArgs,
  ) {
    return await this.rolesService.findAll(
      searchArgs,
      paginationArgs,
      sortArgs,
    );
  }

  @Query(() => Role, { name: 'role' })
  async findOne(@Args('name', { type: () => UserRoles }) name: UserRoles) {
    return await this.rolesService.findOne(name);
  }

  @Mutation(() => Role)
  async updateRole(
    @Args('name', { type: () => UserRoles }) name: UserRoles,
    @Args('updateRoleInput') updateRoleInput: UpdateRoleInput,
  ) {
    return await this.rolesService.update(name, updateRoleInput);
  }

  @Mutation(() => Role)
  async removeRole(@Args('name', { type: () => UserRoles }) name: UserRoles) {
    return await this.rolesService.remove(name);
  }

  @Mutation(() => User)
  async assignRolesToUser(
    @Args('userId') userId: string,
    @Args({ name: 'roles', type: () => [UserRoles] }) roles: UserRoles[],
  ) {
    return this.rolesService.assignRoles(userId, roles);
  }

  @Mutation(() => User)
  async removeRolesFromUser(
    @Args('userId') userId: string,
    @Args({ name: 'roles', type: () => [UserRoles] }) roles: UserRoles[],
  ) {
    return this.rolesService.removeRoles(userId, roles);
  }
}
