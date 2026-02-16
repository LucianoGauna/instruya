import { Roles, type Role } from './auth.types';

export function getJwtSecret(): string {
  return process.env.JWT_SECRET || 'dev-secret';
}

export function isRole(value: unknown): value is Role {
  return (
    typeof value === 'string' &&
    (Object.values(Roles) as string[]).includes(value)
  );
}
