import type { Request, Response } from 'express';
import {
  createAdminEnInstitucion,
  createInstitucionConAdmin,
  findAdminsByInstitucion,
  findInstituciones,
  setAdminActivoById,
  setInstitucionActiva,
  updateInstitucion,
} from './superadmin.service';
import type {
  CreateAdminEnInstitucionBody,
  CreateInstitucionBody,
} from './superadmin.types';

export async function postCrearInstitucionConAdmin(
  req: Request,
  res: Response,
) {
  const body = req.body as CreateInstitucionBody;

  if (!body?.institucion || !body?.admin) {
    return res.status(400).json({ ok: false, message: 'Body inválido' });
  }

  const nombreInst = String(body.institucion.nombre ?? '').trim();
  const emailInst = String(body.institucion.email ?? '').trim();
  const direccion = String(body.institucion.direccion ?? '').trim();

  const adminNombre = String(body.admin.nombre ?? '').trim();
  const adminApellido = String(body.admin.apellido ?? '').trim();
  const adminEmail = String(body.admin.email ?? '').trim();
  const adminPass = String(body.admin.contrasenia ?? '');

  if (
    !nombreInst ||
    !emailInst ||
    !direccion ||
    !adminNombre ||
    !adminApellido ||
    !adminEmail ||
    !adminPass
  ) {
    return res
      .status(400)
      .json({ ok: false, message: 'Faltan campos requeridos' });
  }

  try {
    const result = await createInstitucionConAdmin({
      institucion: { nombre: nombreInst, email: emailInst, direccion },
      admin: {
        nombre: adminNombre,
        apellido: adminApellido,
        email: adminEmail,
        contrasenia: adminPass,
      },
    });

    if (result === 'INSTITUCION_EMAIL_DUP') {
      return res.status(409).json({
        ok: false,
        message: 'Ya existe una institución con ese email',
      });
    }
    if (result === 'ADMIN_EMAIL_DUP') {
      return res
        .status(409)
        .json({ ok: false, message: 'Ya existe un usuario con ese email' });
    }

    return res.status(201).json({ ok: true, ...result });
  } catch (error) {
    console.error('Error en postCrearInstitucionConAdmin:', error);
    return res
      .status(500)
      .json({ ok: false, message: 'Error interno en el servidor' });
  }
}

export async function getInstituciones(req: Request, res: Response) {
  try {
    const instituciones = await findInstituciones();
    return res.json({ ok: true, instituciones });
  } catch (error) {
    console.error('Error en getInstituciones:', error);
    return res
      .status(500)
      .json({ ok: false, message: 'Error interno en el servidor' });
  }
}

export async function patchInstitucion(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id))
    return res.status(400).json({ ok: false, message: 'id inválido' });

  const nombre =
    typeof req.body?.nombre === 'string' ? req.body.nombre.trim() : '';
  const email =
    typeof req.body?.email === 'string' ? req.body.email.trim() : '';
  const direccion =
    typeof req.body?.direccion === 'string' ? req.body.direccion.trim() : '';

  if (!nombre || !email || !direccion)
    return res
      .status(400)
      .json({ ok: false, message: 'nombre/email/direccion requeridos' });

  try {
    const updated = await updateInstitucion({ id, nombre, email, direccion });
    if (!updated)
      return res
        .status(404)
        .json({ ok: false, message: 'Institución no encontrada' });
    return res.json({ ok: true, institucion: updated });
  } catch (e: any) {
    if (e?.code === 'ER_DUP_ENTRY') {
      return res
        .status(409)
        .json({ ok: false, message: 'Email ya usado por otra institución' });
    }
    if (e?.code === 'ER_BAD_NULL_ERROR') {
      return res
        .status(400)
        .json({ ok: false, message: 'direccion no puede ser null' });
    }
    console.error('Error en patchInstitucion:', e);
    return res
      .status(500)
      .json({ ok: false, message: 'Error interno en el servidor' });
  }
}

export async function patchActivarInstitucion(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id))
    return res.status(400).json({ ok: false, message: 'id inválido' });

  try {
    const ok = await setInstitucionActiva(id, 1);
    if (!ok)
      return res
        .status(404)
        .json({ ok: false, message: 'Institución no encontrada' });
    return res.json({ ok: true });
  } catch (e) {
    console.error('Error en patchActivarInstitucion:', e);
    return res
      .status(500)
      .json({ ok: false, message: 'Error interno en el servidor' });
  }
}

export async function patchDesactivarInstitucion(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id))
    return res.status(400).json({ ok: false, message: 'id inválido' });

  try {
    const ok = await setInstitucionActiva(id, 0);
    if (!ok)
      return res
        .status(404)
        .json({ ok: false, message: 'Institución no encontrada' });
    return res.json({ ok: true });
  } catch (e) {
    console.error('Error en patchDesactivarInstitucion:', e);
    return res
      .status(500)
      .json({ ok: false, message: 'Error interno en el servidor' });
  }
}

export async function postCrearAdminEnInstitucion(req: Request, res: Response) {
  const institucionId = Number(req.params.id);
  if (!Number.isFinite(institucionId)) {
    return res.status(400).json({ ok: false, message: 'id inválido' });
  }

  const body = req.body as CreateAdminEnInstitucionBody;
  const nombre = String(body?.nombre ?? '').trim();
  const apellido = String(body?.apellido ?? '').trim();
  const email = String(body?.email ?? '').trim();
  const contrasenia = String(body?.contrasenia ?? '');

  if (!nombre || !apellido || !email || !contrasenia) {
    return res
      .status(400)
      .json({ ok: false, message: 'Faltan campos requeridos' });
  }

  if (contrasenia.length < 6) {
    return res.status(400).json({
      ok: false,
      message: 'La contraseña debe tener al menos 6 caracteres',
    });
  }

  try {
    const result = await createAdminEnInstitucion({
      institucionId,
      nombre,
      apellido,
      email,
      contrasenia,
    });

    if (result === 'INSTITUCION_NOT_FOUND') {
      return res
        .status(404)
        .json({ ok: false, message: 'Institución no encontrada' });
    }
    if (result === 'INSTITUCION_INACTIVA') {
      return res
        .status(409)
        .json({ ok: false, message: 'La institución está inactiva' });
    }
    if (result === 'ADMIN_EMAIL_DUP') {
      return res
        .status(409)
        .json({ ok: false, message: 'Ya existe un usuario con ese email' });
    }

    return res.status(201).json({ ok: true, ...result });
  } catch (error) {
    console.error('Error en postCrearAdminEnInstitucion:', error);
    return res
      .status(500)
      .json({ ok: false, message: 'Error interno en el servidor' });
  }
}

export async function getAdminsByInstitucion(req: Request, res: Response) {
  const institucionId = Number(req.params.id);
  if (!Number.isFinite(institucionId)) {
    return res.status(400).json({ ok: false, message: 'id inválido' });
  }

  try {
    const admins = await findAdminsByInstitucion(institucionId);
    if (admins === null) {
      return res
        .status(404)
        .json({ ok: false, message: 'Institución no encontrada' });
    }

    return res.json({ ok: true, admins });
  } catch (error) {
    console.error('Error en getAdminsByInstitucion:', error);
    return res
      .status(500)
      .json({ ok: false, message: 'Error interno en el servidor' });
  }
}

export async function patchActivarAdmin(req: Request, res: Response) {
  const adminId = Number(req.params.adminId);
  if (!Number.isFinite(adminId)) {
    return res.status(400).json({ ok: false, message: 'adminId inválido' });
  }

  try {
    const ok = await setAdminActivoById(adminId, 1);
    if (!ok) {
      return res
        .status(404)
        .json({ ok: false, message: 'Administrador no encontrado' });
    }
    return res.json({ ok: true });
  } catch (error) {
    console.error('Error en patchActivarAdmin:', error);
    return res
      .status(500)
      .json({ ok: false, message: 'Error interno en el servidor' });
  }
}

export async function patchDesactivarAdmin(req: Request, res: Response) {
  const adminId = Number(req.params.adminId);
  if (!Number.isFinite(adminId)) {
    return res.status(400).json({ ok: false, message: 'adminId inválido' });
  }

  try {
    const ok = await setAdminActivoById(adminId, 0);
    if (!ok) {
      return res
        .status(404)
        .json({ ok: false, message: 'Administrador no encontrado' });
    }
    return res.json({ ok: true });
  } catch (error) {
    console.error('Error en patchDesactivarAdmin:', error);
    return res
      .status(500)
      .json({ ok: false, message: 'Error interno en el servidor' });
  }
}
