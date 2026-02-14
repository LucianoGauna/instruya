import { Router } from 'express';
import { authMiddleware } from '../auth/auth.middleware';
import {
  activarCarrera,
  createCarrera,
  desactivarCarrera,
  getCarreras,
  getDocentes,
  getMateriasDeCarrera,
  updateCarrera,
} from './admin.controller';
import { requireRole } from '../auth/require-role.middleware';
import { Roles } from '../auth/auth.types';

const router = Router();

router.get(
  '/carreras',
  authMiddleware,
  requireRole([Roles.ADMIN]),
  getCarreras
);

router.post(
  '/carreras',
  authMiddleware,
  requireRole([Roles.ADMIN]),
  createCarrera
);

router.patch(
  '/carreras/:id/desactivar',
  authMiddleware,
  requireRole([Roles.ADMIN]),
  desactivarCarrera
);

router.patch(
  '/carreras/:id/activar',
  authMiddleware,
  requireRole([Roles.ADMIN]),
  activarCarrera
);

router.patch(
  '/carreras/:id',
  authMiddleware,
  requireRole([Roles.ADMIN]),
  updateCarrera
);

router.get(
  '/docentes',
  authMiddleware,
  requireRole([Roles.ADMIN]),
  getDocentes
);

router.get(
  '/carreras/:id/materias',
  authMiddleware,
  requireRole([Roles.ADMIN]),
  getMateriasDeCarrera
);

export default router;
