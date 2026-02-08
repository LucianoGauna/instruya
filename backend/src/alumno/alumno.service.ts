import { pool } from '../db';

export async function findMisMaterias(alumnoId: number) {
  const query = `
    SELECT
      im.id AS inscripcion_id,
      im.estado,
      im.fecha,
      im.anio,
      im.periodo,
      m.id AS materia_id,
      m.nombre AS materia_nombre,
      c.id AS carrera_id,
      c.nombre AS carrera_nombre
    FROM inscripcion_materia im
    INNER JOIN materia m ON m.id = im.materia_id
    INNER JOIN carrera c ON c.id = m.carrera_id
    WHERE im.alumno_id = ?
    ORDER BY c.nombre, m.nombre;
  `;

  const [rows] = await pool.query(query, [alumnoId]);
  return rows;
}

export async function findMisCalificaciones(alumnoId: number) {
  const query = `
    SELECT
      cal.id AS calificacion_id,
      cal.tipo,
      cal.fecha,
      cal.nota,

      m.id AS materia_id,
      m.nombre AS materia_nombre,

      d.id AS docente_id,
      d.nombre AS docente_nombre,
      d.apellido AS docente_apellido,
      d.email AS docente_email
    FROM calificacion cal
    INNER JOIN materia m ON m.id = cal.materia_id
    INNER JOIN usuario d ON d.id = cal.docente_id
    WHERE cal.alumno_id = ?
    ORDER BY cal.fecha DESC, m.nombre;
  `;

  const [rows] = await pool.query(query, [alumnoId]);
  return rows;
}

