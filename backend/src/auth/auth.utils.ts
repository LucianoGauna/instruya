import { Roles, type Role } from './auth.types';

export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('JWT_SECRET es requerido en producción');
    }
    return 'dev-secret';
  }

  return secret;
}

export function isRole(value: unknown): value is Role {
  return (
    typeof value === 'string' &&
    (Object.values(Roles) as string[]).includes(value)
  );
}
