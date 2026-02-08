import type { Request, Response, NextFunction } from 'express';
import type { AuthedRequest, Role } from './auth.types';

export function requireRole(allowedRoles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authedReq = req as AuthedRequest;

    if (!authedReq.user) {
      return res.status(401).json({ ok: false, message: 'No autenticado' });
    }

    if (!allowedRoles.includes(authedReq.user.rol)) {
      return res.status(403).json({ ok: false, message: 'No autorizado' });
    }

    return next();
  };
}
