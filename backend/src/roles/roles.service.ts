import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from './entities/role.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { UserRoles } from 'src/auth/roles/user-roles.enum';
import { SearchArgs } from 'src/common/searchArgs';
import { PaginationArgs } from 'src/common/paginationArgs';
import { SortArgs } from 'src/common/sortArgs';
import { RolesResponse } from './dto/roles.response.dto';
import { User, UserDocument } from 'src/auth/entities/user.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createRoleInput: CreateRoleInput): Promise<Role> {
    const role = new this.roleModel(createRoleInput);
    return await role.save();
  }

  async findAll(
    searchArgs: SearchArgs,
    paginationArgs: PaginationArgs,
    sortArgs: SortArgs,
  ) {
    const { search } = searchArgs;
    const { skip = 0, take = -1 } = paginationArgs;
    const { sortBy = 'createdAt', order = 'asc' } = sortArgs;

    const filter: Record<string, any> = {};

    if (search) {
      filter.$or = [{ name: { $regex: search, $options: 'i' } }];
    }

    const totalRoles = await this.roleModel.countDocuments(filter);

    // 🔹 If `take` is -1, fetch all records (ignore pagination)
    let rolesQuery = this.roleModel.find(filter).sort({ [sortBy]: order });

    if (take !== -1) {
      rolesQuery = rolesQuery.skip(skip).limit(take);
    }

    const roles = await rolesQuery.exec();

    return {
      roles,
      totalPages: take === -1 ? 1 : Math.ceil(totalRoles / take),
    };
  }

  async findOne(name: UserRoles): Promise<Role> {
    const role = await this.roleModel.findOne({ name });
    if (!role) {
      throw new NotFoundException(`Role '${name}' not found`);
    }
    return role;
  }

  async update(
    name: UserRoles,
    updateRoleInput: UpdateRoleInput,
  ): Promise<Role> {
    const role = await this.roleModel.findOneAndUpdate(
      { name },
      updateRoleInput,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      },
    );

    if (!role) {
      throw new NotFoundException(`Role '${name}' not found`);
    }

    return role;
  }

  async remove(name: UserRoles): Promise<Role> {
    const role = await this.roleModel.findOneAndDelete({ name });
    if (!role) {
      throw new NotFoundException(`Role '${name}' not found`);
    }

    return role;
  }

  async assignRoles(userId: string, roles: UserRoles[]): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user)
      throw new NotFoundException(`User with ID '${userId}' not found`);

    const alreadyAssigned = roles.filter((role) => user.roles.includes(role));
    if (alreadyAssigned.length > 0) {
      throw new BadRequestException(
        `User already has the following roles: ${alreadyAssigned.join(', ')}`,
      );
    }

    user.roles = [...user.roles, ...roles];
    await user.save();
    return user;
  }

  async removeRoles(userId: string, roles: UserRoles[]): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user)
      throw new NotFoundException(`User with ID '${userId}' not found`);

    const notAssigned = roles.filter((role) => !user.roles.includes(role));
    if (notAssigned.length > 0) {
      throw new BadRequestException(
        `User does not have the following roles: ${notAssigned.join(', ')}`,
      );
    }

    user.roles = user.roles.filter((role) => !roles.includes(role));
    await user.save();
    return user;
  }
}
