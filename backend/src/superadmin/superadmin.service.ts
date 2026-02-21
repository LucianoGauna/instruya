import { pool } from '../db';
import bcrypt from 'bcrypt';
import type { CreateInstitucionResult } from './superadmin.types';

export async function createInstitucionConAdmin(params: {
  institucion: { nombre: string; email: string; direccion?: string | null };
  admin: {
    nombre: string;
    apellido: string;
    email: string;
    contrasenia: string;
  };
}): Promise<CreateInstitucionResult> {
  const { institucion, admin } = params;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // 1) Institución
    let institucionId: number;
    try {
      const [r1]: any = await conn.query(
        `INSERT INTO institucion (nombre, email, direccion, activa)
         VALUES (?, ?, ?, 1);`,
        [institucion.nombre, institucion.email, institucion.direccion ?? null],
      );
      institucionId = Number(r1.insertId);
    } catch (e: any) {
      if (e?.code === 'ER_DUP_ENTRY') {
        await conn.rollback();
        return 'INSTITUCION_EMAIL_DUP';
      }
      throw e;
    }

    // 2) Admin usuario
    const hash = await bcrypt.hash(admin.contrasenia, 10);

    let adminId: number;
    try {
      const [r2]: any = await conn.query(
        `INSERT INTO usuario (nombre, apellido, email, contrasenia_hash, rol, institucion_id, activo)
         VALUES (?, ?, ?, ?, 'ADMIN', ?, 1);`,
        [admin.nombre, admin.apellido, admin.email, hash, institucionId],
      );
      adminId = Number(r2.insertId);
    } catch (e: any) {
      if (e?.code === 'ER_DUP_ENTRY') {
        await conn.rollback();
        return 'ADMIN_EMAIL_DUP';
      }
      throw e;
    }

    await conn.commit();

    return {
      institucion: {
        id: institucionId,
        nombre: institucion.nombre,
        email: institucion.email,
        direccion: institucion.direccion ?? null,
        activa: 1,
      },
      admin: { id: adminId, email: admin.email },
    };
  } catch (err) {
    try {
      await conn.rollback();
    } catch {}
    throw err;
  } finally {
    conn.release();
  }
}

export async function findInstituciones() {
  const [rows] = await pool.query(
    `SELECT id, nombre, email, direccion, activa, created_at
     FROM institucion
     ORDER BY nombre;`,
  );
  return rows;
}

export async function updateInstitucion(params: {
  id: number;
  nombre: string;
  email: string;
  direccion?: string | null;
}) {
  const { id, nombre, email, direccion } = params;

  // Exist check
  const [exists]: any[] = await pool.query(
    `SELECT id, direccion FROM institucion WHERE id = ? LIMIT 1;`,
    [id],
  );
  if (!exists || exists.length === 0) return null;
  const direccionActual = exists[0].direccion ?? null;

  if (direccion === undefined) {
    await pool.query(
      `UPDATE institucion
       SET nombre = ?, email = ?
       WHERE id = ?;`,
      [nombre, email, id],
    );
  } else {
    await pool.query(
      `UPDATE institucion
       SET nombre = ?, email = ?, direccion = ?
       WHERE id = ?;`,
      [nombre, email, direccion, id],
    );
  }

  return {
    id,
    nombre,
    email,
    direccion: direccion === undefined ? direccionActual : direccion,
  };
}

export async function setInstitucionActiva(id: number, activa: 0 | 1) {
  const [exists]: any[] = await pool.query(
    `SELECT id FROM institucion WHERE id = ? LIMIT 1;`,
    [id],
  );
  if (!exists || exists.length === 0) return false;

  await pool.query(`UPDATE institucion SET activa = ? WHERE id = ?;`, [
    activa,
    id,
  ]);
  return true;
}
