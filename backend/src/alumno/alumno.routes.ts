import { Router } from 'express';
import { authMiddleware } from '../auth/auth.middleware';
import { requireRole } from '../auth/require-role.middleware';
import { Roles } from '../auth/auth.types';
import {
  getDashboardResumenAlumno,
  getMisMaterias,
  getMisCalificaciones,
  getCatalogoMaterias,
  postSolicitarInscripcion,
} from './alumno.controller';

const router = Router();

router.get(
  '/dashboard/resumen',
  authMiddleware,
  requireRole([Roles.ALUMNO]),
  getDashboardResumenAlumno,
);

router.get(
  '/mis-materias',
  authMiddleware,
  requireRole([Roles.ALUMNO]),
  getMisMaterias,
);

router.get(
  '/mis-calificaciones',
  authMiddleware,
  requireRole([Roles.ALUMNO]),
  getMisCalificaciones,
);

router.get(
  '/materias',
  authMiddleware,
  requireRole([Roles.ALUMNO]),
  getCatalogoMaterias,
);

router.post(
  '/materias/:materiaId/inscribirse',
  authMiddleware,
  requireRole([Roles.ALUMNO]),
  postSolicitarInscripcion,
);

export default router;
