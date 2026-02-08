import type { Request, Response } from 'express';
import type { AuthedRequest } from '../auth/auth.types';
import { findMisMateriasDocente } from './docente.service';

export async function getMisMateriasDocente(req: Request, res: Response) {
  try {
    const authedReq = req as AuthedRequest;

    if (!authedReq.user) {
      return res.status(401).json({ ok: false, message: 'No autenticado' });
    }

    if (authedReq.user.rol !== 'DOCENTE') {
      return res.status(403).json({ ok: false, message: 'No autorizado' });
    }

    const docenteId = authedReq.user.id;

    const materias = await findMisMateriasDocente(docenteId);

    return res.json({ ok: true, materias });
  } catch (error) {
    console.error('Error en getMisMateriasDocente:', error);
    return res.status(500).json({ ok: false, message: 'Error interno en el servidor' });
  }
}
