import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { RolesGuard } from 'src/auth/guards/authorization.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { UserRoles } from 'src/auth/roles/user-roles.enum';
import { User } from 'src/auth/entities/user.entity';
import { SearchArgs } from 'src/common/searchArgs';
import { PaginationArgs } from 'src/common/paginationArgs';
import { SortArgs } from 'src/common/sortArgs';
import { UpdateUserInput } from './dto/update-user.input';
import { ObjectIdValidationPipe } from 'src/pipes/object-id-validation.pipe';
import { User as UserDecorator } from '../decorators/user.decorator';
import { UserJWTResponse } from 'src/auth/types/jwt.types';
import { UserResponse } from './dto/userResponse.dto';
import { UserFilterArgs } from './dto/user-filter.args';
import { DeleteAllUsersResponse } from './dto/delete-result.dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserResponse, { name: 'findAllUsers' })
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  async findAll(
    @Args() searchArgs: SearchArgs,
    @Args() paginationArgs: PaginationArgs,
    @Args() sortArgs: SortArgs,
    @Args() filterArgs: UserFilterArgs,
  ) {
    return await this.usersService.findAll(
      searchArgs,
      paginationArgs,
      sortArgs,
      filterArgs,
    );
  }

  @Query(() => User, { name: 'user' })
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.USER)
  findOne(
    @Args('id', { type: () => String }, ObjectIdValidationPipe) id: string,
  ) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.USER)
  updateUser(
    @Args('id', { type: () => String }, ObjectIdValidationPipe) id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => User)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.USER)
  removeUser(
    @Args('id', { type: () => String }, ObjectIdValidationPipe) id: string,
  ) {
    return this.usersService.remove(id);
  }

  @Mutation(() => DeleteAllUsersResponse)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  removeAllUsers() {
    return this.usersService.removeAllUsers();
  }

  @Mutation(() => User)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.USER)
  async updateCurrencySymbol(
    @Args('currencySymbol', { type: () => String }) currencySymbol: string,
    @UserDecorator() user: UserJWTResponse,
  ) {
    return this.usersService.updateCurrencySymbol(user._id, currencySymbol);
  }

  @Query(() => String, { name: 'getCurrencySymbol' })
  @UseGuards(AccessTokenGuard)
  async getCurrencySymbol(@UserDecorator() user: UserJWTResponse) {
    return this.usersService.getCurrencySymbol(user._id);
  }

  @Query(() => [String])
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.USER)
  getPermissionsByUser(@UserDecorator() user: UserJWTResponse) {
    return this.usersService.getUserPermissions(user._id.toString());
  }

  @Query(() => [String])
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  getUserPermissions(
    @Args('id', { type: () => String }, ObjectIdValidationPipe) id: string,
  ) {
    return this.usersService.getUserPermissions(id);
  }

  @Mutation(() => [String])
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  updateUserPermissions(
    @Args('id', { type: () => String }, ObjectIdValidationPipe) id: string,
    @Args('permissions', { type: () => [String] }) permissions: string[],
  ) {
    return this.usersService.updateUserPermissions(id, permissions);
  }
}
