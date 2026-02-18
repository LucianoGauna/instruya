import { pool } from '../db';
import {
  CreateMateriaResult,
  Periodo,
  PERIODOS_VALIDOS,
  UpdateMateriaResult,
} from './admin.types';

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
  const institucionId = await findInstitucionIdByUserId(adminUserId);

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
  if (!institucionId) return false;

  const [existsRows]: any[] = await pool.query(
    `SELECT id FROM carrera WHERE id = ? AND institucion_id = ? LIMIT 1;`,
    [carreraId, institucionId]
  );

  if (!existsRows || existsRows.length === 0) return false;

  await pool.query(
    `UPDATE carrera
     SET activa = ?
     WHERE id = ? AND institucion_id = ?;`,
    [activa, carreraId, institucionId]
  );

  return true;
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
      m.activa AS activa,
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

export async function setMateriaActivaForAdmin(
  adminUserId: number,
  materiaId: number,
  activa: 0 | 1
): Promise<boolean> {
  // Exist check (evita falsos 404 si no cambia nada)
  const [existsRows]: any[] = await pool.query(
    `
    SELECT m.id
    FROM materia m
    INNER JOIN carrera c ON c.id = m.carrera_id
    INNER JOIN usuario admin ON admin.institucion_id = c.institucion_id
    WHERE admin.id = ?
      AND m.id = ?
    LIMIT 1;
    `,
    [adminUserId, materiaId]
  );

  if (!existsRows || existsRows.length === 0) {
    return false;
  }

  await pool.query(
    `
    UPDATE materia m
    INNER JOIN carrera c ON c.id = m.carrera_id
    INNER JOIN usuario admin ON admin.institucion_id = c.institucion_id
    SET m.activa = ?
    WHERE admin.id = ?
      AND m.id = ?;
    `,
    [activa, adminUserId, materiaId]
  );

  return true;
}

export async function updateMateriaForAdmin(
  adminUserId: number,
  materiaId: number,
  nombre: string,
  docenteId: number
): Promise<UpdateMateriaResult> {
  // Validar materia primero (pertenece a institución del admin)
  const [matRows]: any[] = await pool.query(
    `
    SELECT m.id
    FROM materia m
    INNER JOIN carrera c ON c.id = m.carrera_id
    INNER JOIN usuario admin ON admin.institucion_id = c.institucion_id
    WHERE admin.id = ?
      AND m.id = ?
    LIMIT 1;
    `,
    [adminUserId, materiaId]
  );

  if (!matRows || matRows.length === 0) {
    return 'MATERIA_NOT_FOUND';
  }

  // Validar docente (misma institución, rol DOCENTE, activo)
  const [docRows]: any[] = await pool.query(
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

  if (!docRows || docRows.length === 0) {
    return 'DOCENTE_NOT_FOUND';
  }

  // Update (sin depender de affectedRows, porque puede ser 0 si no cambia nada)
  await pool.query(
    `
    UPDATE materia m
    INNER JOIN carrera c ON c.id = m.carrera_id
    INNER JOIN usuario admin ON admin.institucion_id = c.institucion_id
    SET m.nombre = ?, m.docente_id = ?
    WHERE admin.id = ?
      AND m.id = ?;
    `,
    [nombre, docenteId, adminUserId, materiaId]
  );

  return 'OK';
}

export async function findCarreraByIdForAdmin(
  adminUserId: number,
  carreraId: number
) {
  const [rows]: any[] = await pool.query(
    `
    SELECT
      c.id,
      c.nombre,
      c.activa,
      c.created_at
    FROM carrera c
    INNER JOIN usuario admin ON admin.institucion_id = c.institucion_id
    WHERE admin.id = ?
      AND c.id = ?
    LIMIT 1;
    `,
    [adminUserId, carreraId]
  );

  return rows.length ? rows[0] : null;
}

function toDateOnlyISO(value: any): string {
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export async function findInscriptosPendientes() {
  const [rows]: any[] = await pool.query(
    `
    SELECT
      im.id AS inscripcion_id,
      im.fecha AS fecha,
      im.created_at AS created_at,

      u.id AS alumno_id,
      u.nombre AS alumno_nombre,
      u.apellido AS alumno_apellido,
      u.email AS alumno_email,

      ap.legajo AS legajo,
      ap.cohorte AS cohorte,

      m.id AS materia_id,
      m.nombre AS materia_nombre,

      c.id AS carrera_id,
      c.nombre AS carrera_nombre

    FROM inscripcion_materia im
    INNER JOIN usuario u ON u.id = im.alumno_id
    LEFT JOIN alumno_perfil ap ON ap.usuario_id = u.id
    INNER JOIN materia m ON m.id = im.materia_id
    INNER JOIN carrera c ON c.id = m.carrera_id

    WHERE im.estado = 'PENDIENTE'
    ORDER BY im.created_at DESC;
    `
  );

  return (rows ?? []).map((r: any) => ({
    inscripcion_id: Number(r.inscripcion_id),

    alumno_id: Number(r.alumno_id),
    alumno_nombre: String(r.alumno_nombre),
    alumno_apellido: String(r.alumno_apellido),
    alumno_email: String(r.alumno_email),
    legajo: r.legajo ?? null,
    cohorte:
      r.cohorte === null || r.cohorte === undefined ? null : Number(r.cohorte),

    materia_id: Number(r.materia_id),
    materia_nombre: String(r.materia_nombre),

    carrera_id: Number(r.carrera_id),
    carrera_nombre: String(r.carrera_nombre),

    fecha: toDateOnlyISO(r.fecha),
    created_at:
      r.created_at instanceof Date
        ? r.created_at.toISOString()
        : String(r.created_at),
  }));
}

export async function aceptarInscripcion(params: {
  inscripcionId: number;
  anio: number;
  periodo: Periodo;
}) {
  const { inscripcionId, anio, periodo } = params;

  if (!Number.isFinite(anio) || anio < 2000 || anio > 2100)
    return 'ANIO_INVALIDO';
  if (!PERIODOS_VALIDOS.has(periodo)) return 'PERIODO_INVALIDO';

  const [rows]: any[] = await pool.query(
    `SELECT id, estado FROM inscripcion_materia WHERE id = ? LIMIT 1;`,
    [inscripcionId]
  );

  if (!rows || rows.length === 0) return 'NOT_FOUND';
  if (rows[0].estado !== 'PENDIENTE') return 'NOT_PENDIENTE';

  await pool.query(
    `
    UPDATE inscripcion_materia
    SET estado = 'ACEPTADA',
        anio = ?,
        periodo = ?,
        fecha = CURDATE()
    WHERE id = ?;
    `,
    [anio, periodo, inscripcionId]
  );

  return 'OK';
}

export async function rechazarInscripcion(params: { inscripcionId: number }) {
  const { inscripcionId } = params;

  const [rows]: any[] = await pool.query(
    `SELECT id, estado FROM inscripcion_materia WHERE id = ? LIMIT 1;`,
    [inscripcionId]
  );

  if (!rows || rows.length === 0) return 'NOT_FOUND';
  if (rows[0].estado !== 'PENDIENTE') return 'NOT_PENDIENTE';

  await pool.query(
    `
    UPDATE inscripcion_materia
    SET estado = 'RECHAZADA',
        anio = NULL,
        periodo = NULL,
        fecha = CURDATE()
    WHERE id = ?;
    `,
    [inscripcionId]
  );

  return 'OK';
}
