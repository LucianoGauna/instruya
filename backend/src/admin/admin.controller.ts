import type { Request, Response } from 'express';
import type { AuthedRequest } from '../auth/auth.types';
import { findCarrerasByAdminUserId, createCarreraForAdmin } from './admin.service';

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

export async function createCarrera(req: Request, res: Response) {
  try {
    const adminUserId = (req as AuthedRequest).user.id;

    const { nombre } = req.body;

    if (typeof nombre !== 'string' || nombre.trim().length === 0) {
      return res.status(400).json({ ok: false, message: 'El nombre es requerido' });
    }

    const nombreLimpio = nombre.trim();

    const carrera = await createCarreraForAdmin(adminUserId, nombreLimpio);

    return res.status(201).json({
      ok: true,
      carrera,
    });
  } catch (error: any) {
    if (error?.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        ok: false,
        message: 'Ya existe una carrera con ese nombre en la institución',
      });
    }

    console.error('Error en createCarrera:', error);
    return res.status(500).json({ ok: false, message: 'Error interno en el servidor' });
  }
}
