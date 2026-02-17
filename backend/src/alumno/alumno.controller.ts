import type { Request, Response } from 'express';
import type { AuthedRequest } from '../auth/auth.types';
import {
  findCatalogoMaterias,
  findMisCalificaciones,
  findMisMaterias,
  solicitarInscripcion,
} from './alumno.service';

export async function getMisMaterias(req: Request, res: Response) {
  try {
    const alumnoId = (req as AuthedRequest).user.id;
    const materias = await findMisMaterias(alumnoId);
    return res.json({ ok: true, materias });
  } catch (error) {
    console.error('Error en getMisMaterias:', error);
    return res
      .status(500)
      .json({ ok: false, message: 'Error interno en el servidor' });
  }
}

export async function getMisCalificaciones(req: Request, res: Response) {
  try {
    const alumnoId = (req as AuthedRequest).user.id;
    const calificaciones = await findMisCalificaciones(alumnoId);
    return res.json({ ok: true, calificaciones });
  } catch (error) {
    console.error('Error en getMisCalificaciones:', error);
    return res
      .status(500)
      .json({ ok: false, message: 'Error interno en el servidor' });
  }
}

export async function getCatalogoMaterias(req: Request, res: Response) {
  try {
    const alumnoId = (req as AuthedRequest).user.id;

    const result = await findCatalogoMaterias(alumnoId);

    if (result === 'ALUMNO_SIN_CARRERA') {
      return res
        .status(404)
        .json({ ok: false, message: 'Perfil de alumno no encontrado' });
    }

    return res.json(result);
  } catch (error) {
    console.error('Error en getCatalogoMaterias:', error);
    return res
      .status(500)
      .json({ ok: false, message: 'Error interno en el servidor' });
  }
}

export async function postSolicitarInscripcion(req: Request, res: Response) {
  const materiaId = Number(req.params.materiaId);
  if (!Number.isFinite(materiaId)) {
    return res.status(400).json({ ok: false, message: 'materiaId inválido' });
  }

  try {
    const alumnoId = (req as AuthedRequest).user.id;

    const result = await solicitarInscripcion({ alumnoId, materiaId });

    if (result === 'ALUMNO_SIN_CARRERA') {
      return res
        .status(404)
        .json({ ok: false, message: 'Perfil de alumno no encontrado' });
    }
    if (result === 'MATERIA_NOT_FOUND') {
      return res
        .status(404)
        .json({ ok: false, message: 'Materia no encontrada' });
    }
    if (result === 'YA_INSCRIPTO') {
      return res
        .status(409)
        .json({
          ok: false,
          message: 'Ya tenés una inscripción para esa materia',
        });
    }

    return res.status(201).json({ ok: true, inscripcion: result });
  } catch (error) {
    console.error('Error en postSolicitarInscripcion:', error);
    return res
      .status(500)
      .json({ ok: false, message: 'Error interno en el servidor' });
  }
}
