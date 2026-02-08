import type { Request, Response } from 'express';
import type { AuthedRequest } from '../auth/auth.types';
import { findCarrerasByAdminUserId } from './admin.service';

export async function getCarreras(req: Request, res: Response) {
  try {
    const adminUserId = (req as AuthedRequest).user.id;

    const carreras = await findCarrerasByAdminUserId(adminUserId);

    return res.json({ ok: true, carreras });
  } catch (error) {
    console.error('Error en getCarreras:', error);
    return res.status(500).json({ ok: false, message: 'Error interno en el servidor' });
  }
}
