import { pool } from '../db';

export interface User {
  id: number;
  email: string;
  role: 'SUPERADMIN' | 'ADMIN' | 'DOCENTE' | 'ALUMNO';
  contrasenia_hash: string;
}

export async function findUserByEmailAndPassword(
  email: string,
  password: string
): Promise<User | null> {

  const query = `
    SELECT id, email, rol, contrasenia_hash
    FROM usuario
    WHERE email = ?
    LIMIT 1;
  `;

  try {
    const [rows]: any[] = await pool.query(query, [email]);

    if (rows.length === 0) {
      return null;
    }

    const user = rows[0] as User;

    if (password !== user.contrasenia_hash) {
      return null;
    }

    return user;

  } catch (error) {
    console.error('Error en findUserByEmailAndPassword:', error);
    return null;
  }
}
