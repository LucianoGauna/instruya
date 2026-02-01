import { Router } from 'express';
import { pool } from '../db';
import { authMiddleware } from '../auth/auth.middleware';

type AuthUser = {
  id: number;
  email: string;
  rol: 'SUPERADMIN' | 'ADMIN' | 'DOCENTE' | 'ALUMNO';
};

const router = Router();

router.get('/mis-materias', authMiddleware, async (req, res) => {
  const user = (req as unknown as { user: AuthUser }).user;

  if (user.rol !== 'ALUMNO') {
    return res.status(403).json({ ok: false, message: 'No autorizado' });
  }

  const alumnoId = user.id;

  const query = `
    SELECT
      im.id AS inscripcion_id,
      im.estado,
      im.fecha,
      im.anio,
      im.periodo,
      m.id AS materia_id,
      m.nombre AS materia_nombre,
      c.id AS carrera_id,
      c.nombre AS carrera_nombre
    FROM inscripcion_materia im
    INNER JOIN materia m ON m.id = im.materia_id
    INNER JOIN carrera c ON c.id = m.carrera_id
    WHERE im.alumno_id = ?
    ORDER BY c.nombre, m.nombre;
  `;

  try {
    const [rows] = await pool.query(query, [alumnoId]);

    return res.json({
      ok: true,
      materias: rows,
    });
  } catch (error) {
    console.error('Error en /alumno/mis-materias:', error);
    return res.status(500).json({ ok: false, message: 'Error interno en el servidor' });
  }
});

export default router;
