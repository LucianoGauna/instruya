import { pool } from '../db';
import bcrypt from 'bcrypt';
import { User } from './auth.types';

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

    if (!user.activo) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(
      password,
      user.contrasenia_hash
    );
    if (!isValidPassword) {
      return null;
    }

    return user;

  } catch (error) {
    console.error('Error en findUserByEmailAndPassword:', error);
    return null;
  }
}
