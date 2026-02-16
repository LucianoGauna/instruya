import type { Request, Response } from 'express';
import type { AuthedRequest } from '../auth/auth.types';
import {
  createCalificacionForDocente,
  findCalificacionesByMateriaForDocente,
  findInscriptosByMateriaForDocente,
  findMisMateriasDocente,
  updateCalificacionForDocente,
} from './docente.service';
import { isTipoCalificacion } from './shared/calificaciones.types';

export async function getMisMateriasDocente(req: Request, res: Response) {
  try {
    const docenteId = (req as AuthedRequest).user.id;
    const materias = await findMisMateriasDocente(docenteId);
    return res.json({ ok: true, materias });
  } catch (error) {
    console.error('Error en getMisMateriasDocente:', error);
    return res
      .status(500)
      .json({ ok: false, message: 'Error interno en el servidor' });
  }
}

export async function getInscriptosByMateria(req: Request, res: Response) {
  const materiaId = Number(req.params.materiaId);

  if (!Number.isFinite(materiaId)) {
    return res.status(400).json({ ok: false, message: 'materiaId inválido' });
  }

  try {
    const docenteId = (req as AuthedRequest).user.id;

    const inscriptos = await findInscriptosByMateriaForDocente(
      docenteId,
      materiaId
    );

    if (inscriptos === null) {
      return res
        .status(404)
        .json({ ok: false, message: 'Materia no encontrada' });
    }

    const calificaciones = await findCalificacionesByMateriaForDocente(
      docenteId,
      materiaId
    );

    if (calificaciones === null) {
      return res
        .status(404)
        .json({ ok: false, message: 'Materia no encontrada' });
    }

    const califByAlumno = new Map<number, any[]>();
    for (const c of calificaciones) {
      const alumnoId = Number(c.alumno_id);
      const arr = califByAlumno.get(alumnoId) ?? [];
      arr.push(c);
      califByAlumno.set(alumnoId, arr);
    }

    const inscriptosConNotas = (inscriptos as any[]).map((i) => ({
      ...i,
      calificaciones: califByAlumno.get(Number(i.alumno_id)) ?? [],
    }));

    return res.json({ ok: true, inscriptos: inscriptosConNotas });
  } catch (error) {
    console.error('Error en getInscriptosByMateria:', error);
    return res
      .status(500)
      .json({ ok: false, message: 'Error interno en el servidor' });
  }
}

export async function createCalificacion(req: Request, res: Response) {
  const materiaId = Number(req.params.materiaId);
  if (!Number.isFinite(materiaId)) {
    return res.status(400).json({ ok: false, message: 'materiaId inválido' });
  }

  const { alumno_id, tipo, fecha, nota, descripcion } = req.body;

  const alumnoId = Number(alumno_id);
  if (!Number.isFinite(alumnoId)) {
    return res.status(400).json({ ok: false, message: 'alumno_id inválido' });
  }

  if (
    typeof tipo !== 'string' ||
    typeof fecha !== 'string' ||
    typeof nota !== 'string'
  ) {
    return res.status(400).json({ ok: false, message: 'Datos inválidos' });
  }

  if (!isTipoCalificacion(tipo)) {
    return res.status(400).json({ ok: false, message: 'tipo inválido' });
  }

  try {
    const docenteId = (req as AuthedRequest).user.id;

    const result = await createCalificacionForDocente({
      docenteId,
      materiaId,
      alumnoId,
      tipo,
      fecha,
      nota,
      descripcion: typeof descripcion === 'string' ? descripcion.trim() : null,
    });

    if (result === 'MATERIA_NOT_FOUND') {
      return res
        .status(404)
        .json({ ok: false, message: 'Materia no encontrada' });
    }
    if (result === 'ALUMNO_NO_INSCRIPTO') {
      return res
        .status(400)
        .json({ ok: false, message: 'Alumno no inscripto' });
    }

    return res.status(201).json({ ok: true, calificacion: result });
  } catch (error) {
    console.error('Error en createCalificacion:', error);
    return res
      .status(500)
      .json({ ok: false, message: 'Error interno en el servidor' });
  }
}

export async function updateCalificacion(req: Request, res: Response) {
  const calificacionId = Number(req.params.calificacionId);
  if (!Number.isFinite(calificacionId)) {
    return res
      .status(400)
      .json({ ok: false, message: 'calificacionId inválido' });
  }

  const { tipo, fecha, nota, descripcion } = req.body;

  if (
    typeof tipo !== 'string' ||
    typeof fecha !== 'string' ||
    typeof nota !== 'string'
  ) {
    return res.status(400).json({ ok: false, message: 'Datos inválidos' });
  }

  if (!isTipoCalificacion(tipo)) {
    return res.status(400).json({ ok: false, message: 'tipo inválido' });
  }

  try {
    const docenteId = (req as AuthedRequest).user.id;

    const result = await updateCalificacionForDocente({
      docenteId,
      calificacionId,
      tipo,
      fecha,
      nota,
      descripcion: typeof descripcion === 'string' ? descripcion.trim() : null,
    });

    if (result === 'CALIFICACION_NOT_FOUND') {
      return res
        .status(404)
        .json({ ok: false, message: 'Calificación no encontrada' });
    }

    return res.json({ ok: true });
  } catch (error) {
    console.error('Error en updateCalificacion:', error);
    return res
      .status(500)
      .json({ ok: false, message: 'Error interno en el servidor' });
  }
}
