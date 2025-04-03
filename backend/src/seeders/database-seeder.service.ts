import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRoles } from 'src/auth/roles/user-roles.enum';
import { User, UserDocument } from 'src/auth/entities/user.entity';
import { Role, RoleDocument } from 'src/roles/entities/role.entity';
import { updatePermissionsFileForUser } from 'src/permissions/permissions.utils';
import { AVAILABLE_PERMISSIONS } from 'src/permissions/available-permissions';

@Injectable()
export class DatabaseSeeder implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
  ) {}

  async onModuleInit() {
    await this.seedRoles();
    await this.seedAdminUser();
  }

  private async seedAdminUser() {
    const existingUser = await this.userModel.findOne({
      email: 'royatali94@gmail.com',
    });

    if (!existingUser) {
      const user = new this.userModel({
        username: 'royatali94',
        email: 'royatali94@gmail.com',
        password: 'Aa123456',
        roles: [UserRoles.USER, UserRoles.ADMIN],
      });
      const savedUser = await user.save();
      updatePermissionsFileForUser(
        savedUser._id.toString(),
        AVAILABLE_PERMISSIONS,
      );
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists, skipping seeding.');
    }
  }

  private async seedRoles() {
    const existingRoles = await this.roleModel.find({});
    const existingRoleNames = existingRoles.map((role) => role.name);

    const rolesToInsert = Object.values(UserRoles).filter(
      (role) => !existingRoleNames.includes(role),
    );

    if (rolesToInsert.length > 0) {
      await this.roleModel.insertMany(
        rolesToInsert.map((role) => ({ name: role })),
      );
      console.log('Roles seeded successfully:', rolesToInsert);
    } else {
      console.log('All roles already exist. Skipping seeding.');
    }
  }
}
