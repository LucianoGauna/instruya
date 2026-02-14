import { Router } from 'express';
import { authMiddleware } from '../auth/auth.middleware';
import { createCarrera, getCarreras } from './admin.controller';
import { requireRole } from '../auth/require-role.middleware';
import { Roles } from '../auth/auth.types';

const router = Router();

router.get('/carreras', authMiddleware, requireRole([Roles.ADMIN]), getCarreras);
router.post('/carreras', authMiddleware, requireRole([Roles.ADMIN]), createCarrera);

export default router;
