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
  postCrearAdminEnInstitucion,
  getAdminsByInstitucion,
} from './superadmin.controller';

const router = Router();

router.get(
  '/instituciones',
  authMiddleware,
  requireRole([Roles.SUPERADMIN]),
  getInstituciones,
);

router.post(
  '/instituciones',
  authMiddleware,
  requireRole([Roles.SUPERADMIN]),
  postCrearInstitucionConAdmin,
);

router.patch(
  '/instituciones/:id',
  authMiddleware,
  requireRole([Roles.SUPERADMIN]),
  patchInstitucion,
);

router.patch(
  '/instituciones/:id/activar',
  authMiddleware,
  requireRole([Roles.SUPERADMIN]),
  patchActivarInstitucion,
);

router.patch(
  '/instituciones/:id/desactivar',
  authMiddleware,
  requireRole([Roles.SUPERADMIN]),
  patchDesactivarInstitucion,
);

router.post(
  '/instituciones/:id/admins',
  authMiddleware,
  requireRole([Roles.SUPERADMIN]),
  postCrearAdminEnInstitucion,
);

router.get(
  '/instituciones/:id/admins',
  authMiddleware,
  requireRole([Roles.SUPERADMIN]),
  getAdminsByInstitucion,
);

export default router;
