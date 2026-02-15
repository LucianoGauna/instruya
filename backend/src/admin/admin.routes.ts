import { Router } from 'express';
import { authMiddleware } from '../auth/auth.middleware';
import {
  activarCarrera,
  activarMateria,
  createCarrera,
  createMateriaEnCarrera,
  desactivarCarrera,
  desactivarMateria,
  getCarreras,
  getDocentes,
  getMateriasDeCarrera,
  updateCarrera,
  updateMateria,
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

router.post(
  '/carreras/:id/materias',
  authMiddleware,
  requireRole([Roles.ADMIN]),
  createMateriaEnCarrera
);

router.patch(
  '/materias/:id/activar',
  authMiddleware,
  requireRole([Roles.ADMIN]),
  activarMateria
);

router.patch(
  '/materias/:id/desactivar',
  authMiddleware,
  requireRole([Roles.ADMIN]),
  desactivarMateria
);

router.patch(
  '/materias/:id',
  authMiddleware,
  requireRole([Roles.ADMIN]),
  updateMateria
);

export default router;
