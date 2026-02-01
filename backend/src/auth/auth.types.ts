import type { Request } from 'express';

export type Role = 'SUPERADMIN' | 'ADMIN' | 'DOCENTE' | 'ALUMNO';

export interface AuthUser {
  id: number;
  email: string;
  rol: Role;
}

/**
 * Request“autenticado: es un Request normal, pero con req.user disponible.
 */
export type AuthedRequest = Request & { user: AuthUser };
