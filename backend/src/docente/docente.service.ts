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
