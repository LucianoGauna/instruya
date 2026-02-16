import { Router } from 'express';
import { authMiddleware } from '../auth/auth.middleware';
import { requireRole } from '../auth/require-role.middleware';
import { Roles } from '../auth/auth.types';
import { getMisMaterias, getMisCalificaciones } from './alumno.controller';

const router = Router();

router.get(
  '/mis-materias',
  authMiddleware,
  requireRole([Roles.ALUMNO]),
  getMisMaterias
);

router.get(
  '/mis-calificaciones',
  authMiddleware,
  requireRole([Roles.ALUMNO]),
  getMisCalificaciones
);

export default router;
