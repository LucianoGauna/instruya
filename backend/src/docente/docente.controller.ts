import type { Request, Response } from 'express';
import type { AuthedRequest } from '../auth/auth.types';
import {
  findCalificacionesByMateriaForDocente,
  findInscriptosByMateriaForDocente,
  findMisMateriasDocente,
} from './docente.service';

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
