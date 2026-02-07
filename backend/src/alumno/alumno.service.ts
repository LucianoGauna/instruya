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
