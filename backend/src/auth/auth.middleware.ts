import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { AuthUser, AuthedRequest } from './auth.types';
import { getJwtSecret, isRole } from './auth.utils';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ ok: false, message: 'Falta Authorization' });
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res
      .status(401)
      .json({ ok: false, message: 'Formato inválido (Bearer)' });
  }

  try {
    const decoded = jwt.verify(token, getJwtSecret());

    // jwt.verify puede devolver string o un objeto
    if (typeof decoded === 'string') {
      return res.status(401).json({ ok: false, message: 'Token inválido' });
    }

    const payload = decoded as jwt.JwtPayload;

    // Validación mínima para no explotar si el token viene raro
    if (!payload.id || !payload.email || !payload.rol) {
      return res
        .status(401)
        .json({ ok: false, message: 'Token inválido (payload incompleto)' });
    }

    if (!isRole(payload.rol)) {
      return res
        .status(401)
        .json({ ok: false, message: 'Token inválido (rol inválido)' });
    }

    const user: AuthUser = {
      id: Number(payload.id),
      email: String(payload.email),
      rol: payload.rol,
    };

    (req as AuthedRequest).user = user;

    return next();
  } catch {
    return res
      .status(401)
      .json({ ok: false, message: 'Token inválido o expirado' });
  }
}
