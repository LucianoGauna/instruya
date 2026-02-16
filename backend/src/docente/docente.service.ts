import { pool } from '../db';

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
  materiaId: number
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
    [materiaId, docenteId]
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
    [materiaId]
  );

  return rows;
}

export async function findCalificacionesByMateriaForDocente(
  docenteId: number,
  materiaId: number
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
    [materiaId, docenteId]
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
    [materiaId, docenteId]
  );

  return rows;
}
