import { registerEnumType } from '@nestjs/graphql';

export enum UserRoles {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

registerEnumType(UserRoles, {
  name: 'UserRoles',
  description: 'Available user roles',
});
