// src/permissions/permissions.utils.ts
import * as fs from 'fs';
import * as path from 'path';

const permissionsFilePath = path.join(__dirname, '../../permissions.json');

interface PermissionEntry {
  userId: string;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

function readPermissions(): PermissionEntry[] {
  if (!fs.existsSync(permissionsFilePath)) return [];
  const data = fs.readFileSync(permissionsFilePath, 'utf-8');
  return JSON.parse(data).users || [];
}

function writePermissions(entries: PermissionEntry[]) {
  fs.writeFileSync(
    permissionsFilePath,
    JSON.stringify({ users: entries }, null, 2),
  );
}

export function getPermissionsByUserId(userId: string): string[] | null {
  const users = readPermissions();
  const user = users.find((u) => u.userId === userId);
  return user ? user.permissions : null;
}

export function updatePermissionsFileForUser(
  userId: string,
  permissions: string[],
) {
  const now = new Date().toISOString();
  const users = readPermissions();

  const index = users.findIndex((u) => u.userId === userId);
  if (index === -1) {
    users.push({
      userId,
      permissions,
      createdAt: now,
      updatedAt: now,
    });
  } else {
    users[index] = {
      ...users[index],
      permissions,
      updatedAt: now,
    };
  }

  writePermissions(users);
}
