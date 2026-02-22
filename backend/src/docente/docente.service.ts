import { pool } from '../db';
import {
  CreateCalificacionInput,
  CreateCalificacionResult,
  UpdateCalificacionInput,
  UpdateCalificacionResult,
} from './docente.types';

export async function findMisMateriasDocente(docenteId: number) {
  const query = `
    SELECT
      m.id AS materia_id,
      m.nombre AS materia_nombre,
      c.id AS carrera_id,
      c.nombre AS carrera_nombre
    FROM materia m
    INNER JOIN carrera c ON c.id = m.carrera_id
    WHERE m.docente_id = ?
      AND m.activa = 1
    ORDER BY c.nombre, m.nombre;
  `;

  const [rows] = await pool.query(query, [docenteId]);
  return rows;
}

export async function findInscriptosByMateriaForDocente(
  docenteId: number,
  materiaId: number,
) {
  // Validar que la materia sea del docente
  const [matRows]: any[] = await pool.query(
    `
    SELECT id
    FROM materia
    WHERE id = ?
      AND docente_id = ?
    LIMIT 1;
    `,
    [materiaId, docenteId],
  );

  if (!matRows || matRows.length === 0) {
    return null;
  }

  // Traer inscriptos (aceptados)
  const [rows]: any[] = await pool.query(
    `
    SELECT
      u.id AS alumno_id,
      u.nombre,
      u.apellido,
      u.email,
      im.estado,
      im.anio,
      im.periodo
    FROM inscripcion_materia im
    INNER JOIN usuario u ON u.id = im.alumno_id
    WHERE im.materia_id = ?
      AND im.estado = 'ACEPTADA'
      AND u.activo = 1
    ORDER BY u.apellido, u.nombre;
    `,
    [materiaId],
  );

  return rows;
}

export async function findCalificacionesByMateriaForDocente(
  docenteId: number,
  materiaId: number,
) {
  // Validar que la materia sea del docente
  const [matRows]: any[] = await pool.query(
    `
    SELECT id
    FROM materia
    WHERE id = ?
      AND docente_id = ?
    LIMIT 1;
    `,
    [materiaId, docenteId],
  );

  if (!matRows || matRows.length === 0) {
    return null;
  }

  const [rows]: any[] = await pool.query(
    `
    SELECT
      cal.id AS calificacion_id,
      cal.alumno_id,
      cal.materia_id,
      cal.tipo,
      cal.fecha,
      cal.nota,
      cal.descripcion,
      cal.created_at
    FROM calificacion cal
    WHERE cal.materia_id = ?
      AND cal.docente_id = ?
    ORDER BY cal.fecha DESC, cal.id DESC;
    `,
    [materiaId, docenteId],
  );

  return rows;
}

export async function createCalificacionForDocente(
  params: CreateCalificacionInput,
): Promise<CreateCalificacionResult> {
  const { docenteId, materiaId, alumnoId, tipo, fecha, nota, descripcion } =
    params;

  // Materia del docente
  const [matRows]: any[] = await pool.query(
    `SELECT id FROM materia WHERE id = ? AND docente_id = ? LIMIT 1;`,
    [materiaId, docenteId],
  );
  if (!matRows || matRows.length === 0) return 'MATERIA_NOT_FOUND';

  // Alumno inscripto (ACEPTADA) en esa materia
  const [insRows]: any[] = await pool.query(
    `
    SELECT id
    FROM inscripcion_materia
    WHERE materia_id = ?
      AND alumno_id = ?
      AND estado = 'ACEPTADA'
    LIMIT 1;
    `,
    [materiaId, alumnoId],
  );
  if (!insRows || insRows.length === 0) return 'ALUMNO_NO_INSCRIPTO';

  const [result]: any[] = await pool.query(
    `
    INSERT INTO calificacion (alumno_id, materia_id, tipo, fecha, nota, descripcion, docente_id)
    VALUES (?, ?, ?, ?, ?, ?, ?);
    `,
    [alumnoId, materiaId, tipo, fecha, nota, descripcion ?? null, docenteId],
  );

  return {
    id: result.insertId,
    alumno_id: alumnoId,
    materia_id: materiaId,
    tipo,
    fecha,
    nota,
    descripcion: descripcion ?? null,
    docente_id: docenteId,
  };
}

export async function updateCalificacionForDocente(
  params: UpdateCalificacionInput,
): Promise<UpdateCalificacionResult> {
  const { docenteId, calificacionId, tipo, fecha, nota, descripcion } = params;

  // Validar que la calificación sea de una materia del docente
  const [rows]: any[] = await pool.query(
    `
    SELECT cal.id
    FROM calificacion cal
    INNER JOIN materia m ON m.id = cal.materia_id
    WHERE cal.id = ?
      AND m.docente_id = ?
    LIMIT 1;
    `,
    [calificacionId, docenteId],
  );

  if (!rows || rows.length === 0) return 'CALIFICACION_NOT_FOUND';

  await pool.query(
    `
    UPDATE calificacion
    SET tipo = ?, fecha = ?, nota = ?, descripcion = ?
    WHERE id = ? AND docente_id = ?;
    `,
    [tipo, fecha, nota, descripcion ?? null, calificacionId, docenteId],
  );

  return 'OK';
}

export async function findDashboardResumenByDocenteUserId(docenteId: number) {
  const [userRows]: any[] = await pool.query(
    `
    SELECT
      u.id,
      i.id AS institucion_id,
      i.nombre AS institucion_nombre
    FROM usuario u
    LEFT JOIN institucion i ON i.id = u.institucion_id
    WHERE u.id = ?
      AND u.rol = 'DOCENTE'
    LIMIT 1;
    `,
    [docenteId],
  );

  if (!userRows || userRows.length === 0) return null;

  const [materiasRows]: any[] = await pool.query(
    `
    SELECT
      COUNT(*) AS total,
      COUNT(DISTINCT m.carrera_id) AS carreras
    FROM materia m
    WHERE m.docente_id = ?
      AND m.activa = 1;
    `,
    [docenteId],
  );

  const [inscriptosRows]: any[] = await pool.query(
    `
    SELECT
      COUNT(*) AS inscripciones_aceptadas,
      COUNT(DISTINCT im.alumno_id) AS alumnos_unicos
    FROM inscripcion_materia im
    INNER JOIN materia m ON m.id = im.materia_id
    WHERE m.docente_id = ?
      AND m.activa = 1
      AND im.estado = 'ACEPTADA';
    `,
    [docenteId],
  );

  return {
    institucion: userRows[0].institucion_id
      ? {
          id: Number(userRows[0].institucion_id),
          nombre: String(userRows[0].institucion_nombre),
        }
      : null,
    materias: {
      total: Number(materiasRows?.[0]?.total ?? 0),
      carreras: Number(materiasRows?.[0]?.carreras ?? 0),
    },
    alumnos: {
      unicos_inscriptos: Number(inscriptosRows?.[0]?.alumnos_unicos ?? 0),
      inscripciones_aceptadas: Number(
        inscriptosRows?.[0]?.inscripciones_aceptadas ?? 0,
      ),
    },
  };
}
