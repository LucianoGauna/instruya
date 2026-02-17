import { pool } from '../db';
import { GetCatalogoResult, InscribirseResult } from './alumno.types';

export async function findMisMaterias(alumnoId: number) {
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

  const [rows] = await pool.query(query, [alumnoId]);
  return rows;
}

export async function findMisCalificaciones(alumnoId: number) {
  const query = `
    SELECT
      cal.id AS calificacion_id,
      cal.tipo,
      cal.fecha,
      cal.nota,
      cal.descripcion,

      m.id AS materia_id,
      m.nombre AS materia_nombre,

      d.id AS docente_id,
      d.nombre AS docente_nombre,
      d.apellido AS docente_apellido,
      d.email AS docente_email
    FROM calificacion cal
    INNER JOIN materia m ON m.id = cal.materia_id
    INNER JOIN usuario d ON d.id = cal.docente_id
    WHERE cal.alumno_id = ?
    ORDER BY cal.fecha DESC, m.nombre;
  `;

  const [rows] = await pool.query(query, [alumnoId]);
  return rows;
}

async function getCarreraDelAlumno(
  alumnoId: number
): Promise<{ id: number; nombre: string } | null> {
  const [rows]: any[] = await pool.query(
    `
    SELECT c.id, c.nombre
    FROM alumno_perfil ap
    INNER JOIN carrera c ON c.id = ap.carrera_id
    WHERE ap.usuario_id = ?
    LIMIT 1;
    `,
    [alumnoId]
  );

  if (!rows || rows.length === 0) return null;
  return { id: Number(rows[0].id), nombre: String(rows[0].nombre) };
}

export async function findCatalogoMaterias(
  alumnoId: number
): Promise<GetCatalogoResult> {
  const carrera = await getCarreraDelAlumno(alumnoId);
  if (!carrera) return 'ALUMNO_SIN_CARRERA';

  const [rows]: any[] = await pool.query(
    `
    SELECT
      m.id   AS materia_id,
      m.nombre AS materia_nombre,

      im.id     AS inscripcion_id,
      im.estado AS estado,
      im.fecha  AS fecha,
      im.anio   AS anio,
      im.periodo AS periodo
    FROM materia m
    LEFT JOIN inscripcion_materia im
      ON im.materia_id = m.id
     AND im.alumno_id = ?
    WHERE m.carrera_id = ?
      AND m.activa = 1
    ORDER BY m.nombre;
    `,
    [alumnoId, carrera.id]
  );

  const materias = (rows ?? []).map((r: any) => ({
    materia_id: Number(r.materia_id),
    materia_nombre: String(r.materia_nombre),
    inscripcion: r.inscripcion_id
      ? {
          inscripcion_id: Number(r.inscripcion_id),
          estado: r.estado,
          fecha: String(r.fecha),
          anio: r.anio === null ? null : Number(r.anio),
          periodo: r.periodo ?? null,
        }
      : null,
  }));

  return { ok: true, carrera, materias };
}

export async function solicitarInscripcion(params: {
  alumnoId: number;
  materiaId: number;
}): Promise<InscribirseResult> {
  const { alumnoId, materiaId } = params;

  const carrera = await getCarreraDelAlumno(alumnoId);
  if (!carrera) return 'ALUMNO_SIN_CARRERA';

  // Validar que la materia sea de la carrera del alumno (y activa)
  const [matRows]: any[] = await pool.query(
    `
    SELECT id
    FROM materia
    WHERE id = ?
      AND carrera_id = ?
      AND activa = 1
    LIMIT 1;
    `,
    [materiaId, carrera.id]
  );

  if (!matRows || matRows.length === 0) return 'MATERIA_NOT_FOUND';

  // Ver si ya existe inscripción
  const [insRows]: any[] = await pool.query(
    `
    SELECT id, estado
    FROM inscripcion_materia
    WHERE alumno_id = ?
      AND materia_id = ?
    LIMIT 1;
    `,
    [alumnoId, materiaId]
  );

  if (insRows && insRows.length > 0) {
    const existing = insRows[0];
    const estado = String(existing.estado);

    if (estado === 'PENDIENTE' || estado === 'ACEPTADA') {
      return 'YA_INSCRIPTO';
    }

    // RECHAZADA o BAJA -> vuelve a PENDIENTE
    await pool.query(
      `
      UPDATE inscripcion_materia
      SET estado = 'PENDIENTE',
          fecha = CURDATE(),
          anio = NULL,
          periodo = NULL
      WHERE id = ?;
      `,
      [existing.id]
    );

    return { inscripcion_id: Number(existing.id), estado: 'PENDIENTE' };
  }

  // Crear nueva inscripción PENDIENTE
  const [result]: any[] = await pool.query(
    `
    INSERT INTO inscripcion_materia (alumno_id, materia_id, estado, fecha, anio, periodo)
    VALUES (?, ?, 'PENDIENTE', CURDATE(), NULL, NULL);
    `,
    [alumnoId, materiaId]
  );

  return { inscripcion_id: Number(result.insertId), estado: 'PENDIENTE' };
}
