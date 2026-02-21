import { Router } from 'express';
import { authMiddleware } from '../auth/auth.middleware';
import { requireRole } from '../auth/require-role.middleware';
import { Roles } from '../auth/auth.types';
import {
  postCrearInstitucionConAdmin,
  getInstituciones,
  patchInstitucion,
  patchActivarInstitucion,
  patchDesactivarInstitucion,
} from './superadmin.controller';

const router = Router();

router.get(
  '/instituciones',
  authMiddleware,
  requireRole([Roles.SUPERADMIN]),
  getInstituciones
);

router.post(
  '/instituciones',
  authMiddleware,
  requireRole([Roles.SUPERADMIN]),
  postCrearInstitucionConAdmin
);

router.patch(
  '/instituciones/:id',
  authMiddleware,
  requireRole([Roles.SUPERADMIN]),
  patchInstitucion
);

router.patch(
  '/instituciones/:id/activar',
  authMiddleware,
  requireRole([Roles.SUPERADMIN]),
  patchActivarInstitucion
);

router.patch(
  '/instituciones/:id/desactivar',
  authMiddleware,
  requireRole([Roles.SUPERADMIN]),
  patchDesactivarInstitucion
);

export default router;
