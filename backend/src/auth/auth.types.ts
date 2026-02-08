import type { Request } from 'express';

export const Roles = {
  SUPERADMIN: 'SUPERADMIN',
  ADMIN: 'ADMIN',
  DOCENTE: 'DOCENTE',
  ALUMNO: 'ALUMNO',
} as const;

export type Role = typeof Roles[keyof typeof Roles];

export interface AuthUser {
  id: number;
  email: string;
  rol: Role;
}

/**
 * Request“autenticado: es un Request normal, pero con req.user disponible.
 */
export type AuthedRequest = Request & { user: AuthUser };
