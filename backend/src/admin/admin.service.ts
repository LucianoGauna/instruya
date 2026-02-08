import { pool } from '../db';

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
