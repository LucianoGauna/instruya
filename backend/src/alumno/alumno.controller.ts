import type { Request, Response } from 'express';
import type { AuthedRequest } from '../auth/auth.types';
import { findMisCalificaciones, findMisMaterias } from './alumno.service';

export async function getMisMaterias(req: Request, res: Response) {
  try {
    const alumnoId = (req as AuthedRequest).user.id;
    const materias = await findMisMaterias(alumnoId);
    return res.json({ ok: true, materias });
  } catch (error) {
    console.error('Error en getMisMaterias:', error);
    return res.status(500).json({ ok: false, message: 'Error interno en el servidor' });
  }
}

export async function getMisCalificaciones(req: Request, res: Response) {
  try {
    const alumnoId = (req as AuthedRequest).user.id;
    const calificaciones = await findMisCalificaciones(alumnoId);
    return res.json({ ok: true, calificaciones });
  } catch (error) {
    console.error('Error en getMisCalificaciones:', error);
    return res.status(500).json({ ok: false, message: 'Error interno en el servidor' });
  }
}
