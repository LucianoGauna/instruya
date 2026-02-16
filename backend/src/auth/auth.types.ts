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

export interface User {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  contrasenia_hash: string;
  rol: 'SUPERADMIN' | 'ADMIN' | 'DOCENTE' | 'ALUMNO';
  institucion_id: number | null;
  activo: boolean;
  created_at: Date;
}