import { Router } from 'express';
import { authMiddleware } from '../auth/auth.middleware';
import { getMisMateriasDocente } from './docente.controller';

const router = Router();

router.get('/mis-materias', authMiddleware, getMisMateriasDocente);

export default router;
