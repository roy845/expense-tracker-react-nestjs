import { BadRequestException } from '@nestjs/common';

export function validateOwnership<T extends { userId: string | object }>(
  userId: string,
  entity: T | null,
  entityName = 'Entity',
) {
  if (!entity) {
    throw new BadRequestException(`${entityName} not found`);
  }

  if (userId.toString() !== entity.userId.toString()) {
    throw new BadRequestException(
      `You don't own this ${entityName.toLowerCase()}`,
    );
  }
}
