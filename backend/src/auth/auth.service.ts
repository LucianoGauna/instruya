import { pool } from '../db';
import bcrypt from 'bcrypt';

export interface User {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  contrasenia_hash: string;
  rol: 'SUPERADMIN' | 'ADMIN' | 'DOCENTE' | 'ALUMNO';
  institucion_id: number | null;
  activo: boolean;
  created_at: Date;
}

export async function findUserByEmailAndPassword(
  email: string,
  password: string
): Promise<User | null> {

  const query = `
    SELECT 
      id,
      nombre,
      apellido,
      email,
      contrasenia_hash,
      rol,
      institucion_id,
      activo,
      created_at
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

    const isValidPassword = await bcrypt.compare(password, user.contrasenia_hash);
    if (!isValidPassword) {
      return null;
    }

    return user;

  } catch (error) {
    console.error('Error en findUserByEmailAndPassword:', error);
    return null;
  }
}
