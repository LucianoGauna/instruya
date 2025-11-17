import { Request, Response } from 'express';
import { findUserByEmailAndPassword } from './auth.service';
import jwt from 'jsonwebtoken';

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        message: 'Email y contraseña son requeridos'
      });
    }

    // Buscar usuario en DB
    const user = await findUserByEmailAndPassword(email, password);

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: 'Credenciales inválidas'
      });
    }

    // Crear token (JWT)
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET || 'dev-secret',
      { expiresIn: '12h' }
    );

    return res.json({
      ok: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: 'Error interno en el servidor'
    });
  }
}
