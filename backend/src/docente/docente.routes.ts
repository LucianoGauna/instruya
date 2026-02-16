import { Router } from 'express';
import { authMiddleware } from '../auth/auth.middleware';
import { Roles } from '../auth/auth.types';
import {
  getMisMateriasDocente,
  getInscriptosByMateria,
  createCalificacion,
  updateCalificacion,
} from './docente.controller';
import { requireRole } from '../auth/require-role.middleware';

const router = Router();

router.get(
  '/mis-materias',
  authMiddleware,
  requireRole([Roles.DOCENTE]),
  getMisMateriasDocente
);

router.get(
  '/materias/:materiaId/inscriptos',
  authMiddleware,
  requireRole([Roles.DOCENTE]),
  getInscriptosByMateria
);

router.post(
  '/materias/:materiaId/calificaciones',
  authMiddleware,
  requireRole([Roles.DOCENTE]),
  createCalificacion
);

router.patch(
  '/calificaciones/:calificacionId',
  authMiddleware,
  requireRole([Roles.DOCENTE]),
  updateCalificacion
);

export default router;
