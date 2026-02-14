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

export async function createCarreraForAdmin(adminUserId: number, nombre: string) {
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
