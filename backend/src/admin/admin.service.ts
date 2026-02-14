import { pool } from '../db';
import { CreateMateriaResult } from './admin.types';

export async function findCarrerasByAdminUserId(adminUserId: number) {
  const query = `
    SELECT
      c.id,
      c.nombre,
      c.activa,
      c.created_at
    FROM carrera c
    INNER JOIN usuario u ON u.institucion_id = c.institucion_id
    WHERE u.id = ?
    ORDER BY c.nombre;
  `;

  const [rows] = await pool.query(query, [adminUserId]);
  return rows;
}

export async function createCarreraForAdmin(
  adminUserId: number,
  nombre: string
) {
  // Buscar institucion_id del admin
  const [users]: any[] = await pool.query(
    `SELECT institucion_id FROM usuario WHERE id = ? LIMIT 1;`,
    [adminUserId]
  );

  if (!users || users.length === 0) {
    throw new Error('Admin no encontrado');
  }

  const institucionId = users[0].institucion_id as number | null;

  if (!institucionId) {
    throw new Error('El admin no tiene institución asignada');
  }

  const [result]: any[] = await pool.query(
    `INSERT INTO carrera (institucion_id, nombre) VALUES (?, ?);`,
    [institucionId, nombre]
  );

  return {
    id: result.insertId,
    nombre,
    institucion_id: institucionId,
  };
}

async function findInstitucionIdByUserId(
  userId: number
): Promise<number | null> {
  const [rows]: any[] = await pool.query(
    `SELECT institucion_id FROM usuario WHERE id = ? LIMIT 1;`,
    [userId]
  );

  if (!rows || rows.length === 0) return null;
  return rows[0].institucion_id ?? null;
}

export async function setCarreraActivaForAdmin(
  adminUserId: number,
  carreraId: number,
  activa: 0 | 1
): Promise<boolean> {
  const institucionId = await findInstitucionIdByUserId(adminUserId);

  if (!institucionId) {
    return false;
  }

  const [result]: any[] = await pool.query(
    `UPDATE carrera
     SET activa = ?
     WHERE id = ? AND institucion_id = ?;`,
    [activa, carreraId, institucionId]
  );

  return result.affectedRows > 0;
}

export async function updateCarreraNombreForAdmin(
  adminUserId: number,
  carreraId: number,
  nombre: string
): Promise<{ id: number; nombre: string } | null> {
  const institucionId = await findInstitucionIdByUserId(adminUserId);
  if (!institucionId) return null;

  // Validar que la carrera exista y sea de su institución (evita confusión con affectedRows=0)
  const [existsRows]: any[] = await pool.query(
    `SELECT id FROM carrera WHERE id = ? AND institucion_id = ? LIMIT 1;`,
    [carreraId, institucionId]
  );

  if (!existsRows || existsRows.length === 0) return null;

  await pool.query(
    `UPDATE carrera SET nombre = ? WHERE id = ? AND institucion_id = ?;`,
    [nombre, carreraId, institucionId]
  );

  return { id: carreraId, nombre };
}

export async function findDocentesByAdminUserId(adminUserId: number) {
  const query = `
    SELECT
      u.id,
      u.nombre,
      u.apellido,
      u.email
    FROM usuario u
    INNER JOIN usuario admin ON admin.institucion_id = u.institucion_id
    WHERE admin.id = ?
      AND u.rol = 'DOCENTE'
      AND u.activo = 1
    ORDER BY u.apellido, u.nombre;
  `;

  const [rows] = await pool.query(query, [adminUserId]);
  return rows;
}

export async function findMateriasByCarreraForAdmin(
  adminUserId: number,
  carreraId: number
) {
  // Validar que la carrera pertenezca a la institución del admin
  const [carreraRows]: any[] = await pool.query(
    `
    SELECT c.id
    FROM carrera c
    INNER JOIN usuario admin ON admin.institucion_id = c.institucion_id
    WHERE admin.id = ? AND c.id = ?
    LIMIT 1;
    `,
    [adminUserId, carreraId]
  );

  if (!carreraRows || carreraRows.length === 0) {
    return null;
  }

  // Traer materias de esa carrera (con info del docente)
  const [rows] = await pool.query(
    `
    SELECT
      m.id AS materia_id,
      m.nombre AS materia_nombre,
      m.docente_id,
      d.nombre AS docente_nombre,
      d.apellido AS docente_apellido,
      d.email AS docente_email
    FROM materia m
    INNER JOIN usuario d ON d.id = m.docente_id
    WHERE m.carrera_id = ?
    ORDER BY m.nombre;
    `,
    [carreraId]
  );

  return rows;
}

export async function createMateriaForAdminInCarrera(
  adminUserId: number,
  carreraId: number,
  nombre: string,
  docenteId: number
): Promise<CreateMateriaResult> {
  // Validar que la carrera pertenece a la institución del admin
  const [carreraRows]: any[] = await pool.query(
    `
    SELECT c.id
    FROM carrera c
    INNER JOIN usuario admin ON admin.institucion_id = c.institucion_id
    WHERE admin.id = ? AND c.id = ?
    LIMIT 1;
    `,
    [adminUserId, carreraId]
  );

  if (!carreraRows || carreraRows.length === 0) {
    return 'CARRERA_NOT_FOUND';
  }

  // Validar que el docente pertenece a la institución del admin y es DOCENTE activo
  const [docenteRows]: any[] = await pool.query(
    `
    SELECT u.id
    FROM usuario u
    INNER JOIN usuario admin ON admin.institucion_id = u.institucion_id
    WHERE admin.id = ?
      AND u.id = ?
      AND u.rol = 'DOCENTE'
      AND u.activo = 1
    LIMIT 1;
    `,
    [adminUserId, docenteId]
  );

  if (!docenteRows || docenteRows.length === 0) {
    return 'DOCENTE_NOT_FOUND';
  }

  const [result]: any[] = await pool.query(
    `
    INSERT INTO materia (carrera_id, nombre, docente_id)
    VALUES (?, ?, ?);
    `,
    [carreraId, nombre, docenteId]
  );

  return {
    id: result.insertId,
    nombre,
    carrera_id: carreraId,
    docente_id: docenteId,
  };
}
