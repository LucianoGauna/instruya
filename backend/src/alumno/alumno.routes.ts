import { Router } from 'express';
import { authMiddleware } from '../auth/auth.middleware';
import { getMisMaterias } from './alumno.controller';

const router = Router();

router.get('/mis-materias', authMiddleware, getMisMaterias);

export default router;
