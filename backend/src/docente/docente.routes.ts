import { Router } from 'express';
import { authMiddleware } from '../auth/auth.middleware';
import { Roles } from '../auth/auth.types';
import {
  getMisMateriasDocente,
  getInscriptosByMateria,
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

export default router;
