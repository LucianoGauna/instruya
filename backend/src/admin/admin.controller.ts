import type { Request, Response } from 'express';
import type { AuthedRequest } from '../auth/auth.types';
import {
  findCarrerasByAdminUserId,
  createCarreraForAdmin,
  setCarreraActivaForAdmin,
  updateCarreraNombreForAdmin,
  findDocentesByAdminUserId,
  findMateriasByCarreraForAdmin,
  createMateriaForAdminInCarrera,
  setMateriaActivaForAdmin,
  updateMateriaForAdmin,
  findCarreraByIdForAdmin,
} from './admin.service';

export async function getCarreras(req: Request, res: Response) {
  try {
    const adminUserId = (req as AuthedRequest).user.id;
    const carreras = await findCarrerasByAdminUserId(adminUserId);
    return res.json({ ok: true, carreras });
  } catch (error) {
    console.error('Error en getCarreras:', error);
    return res
      .status(500)
      .json({ ok: false, message: 'Error interno en el servidor' });
  }
}

export async function createCarrera(req: Request, res: Response) {
  try {
    const adminUserId = (req as AuthedRequest).user.id;

    const { nombre } = req.body;

    if (typeof nombre !== 'string' || nombre.trim().length === 0) {
      return res
        .status(400)
        .json({ ok: false, message: 'El nombre es requerido' });
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
    return res
      .status(500)
      .json({ ok: false, message: 'Error interno en el servidor' });
  }
}

export async function desactivarCarrera(req: Request, res: Response) {
  const carreraId = Number(req.params.id);
  if (!Number.isFinite(carreraId)) {
    return res.status(400).json({ ok: false, message: 'ID inválido' });
  }

  try {
    const adminUserId = (req as AuthedRequest).user.id;
    const updated = await setCarreraActivaForAdmin(adminUserId, carreraId, 0);

    if (!updated) {
      return res
        .status(404)
        .json({ ok: false, message: 'Carrera no encontrada' });
    }

    return res.json({ ok: true });
  } catch (error) {
    console.error('Error en desactivarCarrera:', error);
    return res
      .status(500)
      .json({ ok: false, message: 'Error interno en el servidor' });
  }
}

export async function activarCarrera(req: Request, res: Response) {
  const carreraId = Number(req.params.id);
  if (!Number.isFinite(carreraId)) {
    return res.status(400).json({ ok: false, message: 'ID inválido' });
  }

  try {
    const adminUserId = (req as AuthedRequest).user.id;
    const updated = await setCarreraActivaForAdmin(adminUserId, carreraId, 1);

    if (!updated) {
      return res
        .status(404)
        .json({ ok: false, message: 'Carrera no encontrada' });
    }

    return res.json({ ok: true });
  } catch (error) {
    console.error('Error en activarCarrera:', error);
    return res
      .status(500)
      .json({ ok: false, message: 'Error interno en el servidor' });
  }
}

export async function updateCarrera(req: Request, res: Response) {
  const carreraId = Number(req.params.id);
  if (!Number.isFinite(carreraId)) {
    return res.status(400).json({ ok: false, message: 'ID inválido' });
  }

  const { nombre } = req.body;
  if (typeof nombre !== 'string' || nombre.trim().length === 0) {
    return res
      .status(400)
      .json({ ok: false, message: 'El nombre es requerido' });
  }

  try {
    const adminUserId = (req as AuthedRequest).user.id;
    const nombreLimpio = nombre.trim();

    const carrera = await updateCarreraNombreForAdmin(
      adminUserId,
      carreraId,
      nombreLimpio
    );

    if (!carrera) {
      return res
        .status(404)
        .json({ ok: false, message: 'Carrera no encontrada' });
    }

    return res.json({ ok: true, carrera });
  } catch (error: any) {
    if (error?.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        ok: false,
        message: 'Ya existe una carrera con ese nombre en la institución',
      });
    }

    console.error('Error en updateCarrera:', error);
    return res
      .status(500)
      .json({ ok: false, message: 'Error interno en el servidor' });
  }
}

export async function getDocentes(req: Request, res: Response) {
  try {
    const adminUserId = (req as AuthedRequest).user.id;

    const docentes = await findDocentesByAdminUserId(adminUserId);

    return res.json({ ok: true, docentes });
  } catch (error) {
    console.error('Error en getDocentes:', error);
    return res
      .status(500)
      .json({ ok: false, message: 'Error interno en el servidor' });
  }
}

export async function getMateriasDeCarrera(req: Request, res: Response) {
  const carreraId = Number(req.params.id);

  if (!Number.isFinite(carreraId)) {
    return res.status(400).json({ ok: false, message: 'ID inválido' });
  }

  try {
    const adminUserId = (req as AuthedRequest).user.id;

    const materias = await findMateriasByCarreraForAdmin(
      adminUserId,
      carreraId
    );

    if (materias === null) {
      return res
        .status(404)
        .json({ ok: false, message: 'Carrera no encontrada' });
    }

    return res.json({ ok: true, materias });
  } catch (error) {
    console.error('Error en getMateriasDeCarrera:', error);
    return res
      .status(500)
      .json({ ok: false, message: 'Error interno en el servidor' });
  }
}

export async function createMateriaEnCarrera(req: Request, res: Response) {
  const carreraId = Number(req.params.id);
  if (!Number.isFinite(carreraId)) {
    return res
      .status(400)
      .json({ ok: false, message: 'ID de carrera inválido' });
  }

  const { nombre, docente_id } = req.body;

  if (typeof nombre !== 'string' || nombre.trim().length === 0) {
    return res
      .status(400)
      .json({ ok: false, message: 'El nombre es requerido' });
  }

  const docenteId = Number(docente_id);
  if (!Number.isFinite(docenteId)) {
    return res.status(400).json({ ok: false, message: 'docente_id inválido' });
  }

  try {
    const adminUserId = (req as AuthedRequest).user.id;

    const result = await createMateriaForAdminInCarrera(
      adminUserId,
      carreraId,
      nombre.trim(),
      docenteId
    );

    if (result === 'CARRERA_NOT_FOUND') {
      return res
        .status(404)
        .json({ ok: false, message: 'Carrera no encontrada' });
    }

    if (result === 'DOCENTE_NOT_FOUND') {
      return res
        .status(404)
        .json({ ok: false, message: 'Docente no encontrado' });
    }

    return res.status(201).json({
      ok: true,
      materia: result,
    });
  } catch (error: any) {
    if (error?.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        ok: false,
        message: 'Ya existe una materia con ese nombre en la carrera',
      });
    }

    console.error('Error en createMateriaEnCarrera:', error);
    return res
      .status(500)
      .json({ ok: false, message: 'Error interno en el servidor' });
  }
}

export async function activarMateria(req: Request, res: Response) {
  const materiaId = Number(req.params.id);
  if (!Number.isFinite(materiaId)) {
    return res.status(400).json({ ok: false, message: 'ID inválido' });
  }

  try {
    const adminUserId = (req as AuthedRequest).user.id;
    const ok = await setMateriaActivaForAdmin(adminUserId, materiaId, 1);

    if (!ok) {
      return res
        .status(404)
        .json({ ok: false, message: 'Materia no encontrada' });
    }

    return res.json({ ok: true });
  } catch (error) {
    console.error('Error en activarMateria:', error);
    return res
      .status(500)
      .json({ ok: false, message: 'Error interno en el servidor' });
  }
}

export async function desactivarMateria(req: Request, res: Response) {
  const materiaId = Number(req.params.id);
  if (!Number.isFinite(materiaId)) {
    return res.status(400).json({ ok: false, message: 'ID inválido' });
  }

  try {
    const adminUserId = (req as AuthedRequest).user.id;
    const ok = await setMateriaActivaForAdmin(adminUserId, materiaId, 0);

    if (!ok) {
      return res
        .status(404)
        .json({ ok: false, message: 'Materia no encontrada' });
    }

    return res.json({ ok: true });
  } catch (error) {
    console.error('Error en desactivarMateria:', error);
    return res
      .status(500)
      .json({ ok: false, message: 'Error interno en el servidor' });
  }
}

export async function updateMateria(req: Request, res: Response) {
  const materiaId = Number(req.params.id);
  if (!Number.isFinite(materiaId)) {
    return res.status(400).json({ ok: false, message: 'ID inválido' });
  }

  const { nombre, docente_id } = req.body;

  if (typeof nombre !== 'string' || nombre.trim().length === 0) {
    return res
      .status(400)
      .json({ ok: false, message: 'El nombre es requerido' });
  }

  const docenteId = Number(docente_id);
  if (!Number.isFinite(docenteId)) {
    return res.status(400).json({ ok: false, message: 'docente_id inválido' });
  }

  try {
    const adminUserId = (req as AuthedRequest).user.id;

    const result = await updateMateriaForAdmin(
      adminUserId,
      materiaId,
      nombre.trim(),
      docenteId
    );

    if (result === 'DOCENTE_NOT_FOUND') {
      return res
        .status(404)
        .json({ ok: false, message: 'Docente no encontrado' });
    }

    if (result === 'MATERIA_NOT_FOUND') {
      return res
        .status(404)
        .json({ ok: false, message: 'Materia no encontrada' });
    }

    return res.json({ ok: true });
  } catch (error: any) {
    if (error?.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        ok: false,
        message: 'Ya existe una materia con ese nombre en la carrera',
      });
    }

    console.error('Error en updateMateria:', error);
    return res
      .status(500)
      .json({ ok: false, message: 'Error interno en el servidor' });
  }
}

export async function getCarreraById(req: Request, res: Response) {
  const carreraId = Number(req.params.id);

  if (!Number.isFinite(carreraId)) {
    return res.status(400).json({ ok: false, message: 'ID inválido' });
  }

  try {
    const adminUserId = (req as AuthedRequest).user.id;
    const carrera = await findCarreraByIdForAdmin(adminUserId, carreraId);

    if (!carrera) {
      return res
        .status(404)
        .json({ ok: false, message: 'Carrera no encontrada' });
    }

    return res.json({ ok: true, carrera });
  } catch (error) {
    console.error('Error en getCarreraById:', error);
    return res
      .status(500)
      .json({ ok: false, message: 'Error interno en el servidor' });
  }
}
