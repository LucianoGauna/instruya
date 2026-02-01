import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

type AuthUser = {
  id: number;
  email: string;
  rol: 'SUPERADMIN' | 'ADMIN' | 'DOCENTE' | 'ALUMNO';
};

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ ok: false, message: 'Falta Authorization' });
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ ok: false, message: 'Formato inválido (Bearer)' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'dev-secret';

    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;

    const user: AuthUser = {
      id: decoded.id as number,
      email: decoded.email as string,
      rol: decoded.rol as AuthUser['rol'],
    };

    // Guardo el user en el request
    (req as Request & { user: AuthUser }).user = user;

    return next();
  } catch {
    return res.status(401).json({ ok: false, message: 'Token inválido o expirado' });
  }
}
