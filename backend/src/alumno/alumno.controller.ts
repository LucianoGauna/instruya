import type { Request, Response } from 'express';
import type { AuthedRequest } from '../auth/auth.types';
import { findMisMaterias } from './alumno.service';

export async function getMisMaterias(req: Request, res: Response) {
  try {
    const authedReq = req as AuthedRequest;

    if (!authedReq.user) {
      return res.status(401).json({ ok: false, message: 'No autenticado' });
    }

    if (authedReq.user.rol !== 'ALUMNO') {
      return res.status(403).json({ ok: false, message: 'No autorizado' });
    }

    const alumnoId = authedReq.user.id;

    const materias = await findMisMaterias(alumnoId);

    return res.json({ ok: true, materias });
  } catch (error) {
    console.error('Error en getMisMaterias:', error);
    return res.status(500).json({ ok: false, message: 'Error interno en el servidor' });
  }
}
