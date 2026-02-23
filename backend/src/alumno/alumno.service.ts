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
      AND im.estado IN ('ACEPTADA', 'PENDIENTE')
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
  alumnoId: number,
): Promise<{ id: number; nombre: string } | null> {
  const [rows]: any[] = await pool.query(
    `
    SELECT c.id, c.nombre
    FROM alumno_perfil ap
    INNER JOIN carrera c ON c.id = ap.carrera_id
    WHERE ap.usuario_id = ?
    LIMIT 1;
    `,
    [alumnoId],
  );

  if (!rows || rows.length === 0) return null;
  return { id: Number(rows[0].id), nombre: String(rows[0].nombre) };
}

export async function findCatalogoMaterias(
  alumnoId: number,
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
    [alumnoId, carrera.id],
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
    [materiaId, carrera.id],
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
    [alumnoId, materiaId],
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
      [existing.id],
    );

    return { inscripcion_id: Number(existing.id), estado: 'PENDIENTE' };
  }

  // Crear nueva inscripción PENDIENTE
  const [result]: any[] = await pool.query(
    `
    INSERT INTO inscripcion_materia (alumno_id, materia_id, estado, fecha, anio, periodo)
    VALUES (?, ?, 'PENDIENTE', CURDATE(), NULL, NULL);
    `,
    [alumnoId, materiaId],
  );

  return { inscripcion_id: Number(result.insertId), estado: 'PENDIENTE' };
}

export async function findDashboardResumenByAlumnoUserId(alumnoId: number) {
  const [userRows]: any[] = await pool.query(
    `
    SELECT
      u.id,
      i.id AS institucion_id,
      i.nombre AS institucion_nombre,
      c.id AS carrera_id,
      c.nombre AS carrera_nombre
    FROM usuario u
    LEFT JOIN alumno_perfil ap ON ap.usuario_id = u.id
    LEFT JOIN carrera c ON c.id = ap.carrera_id
    LEFT JOIN institucion i ON i.id = u.institucion_id
    WHERE u.id = ?
      AND u.rol = 'ALUMNO'
    LIMIT 1;
    `,
    [alumnoId],
  );

  if (!userRows || userRows.length === 0) return null;

  const [aceptadasRows]: any[] = await pool.query(
    `
    SELECT COUNT(*) AS total
    FROM inscripcion_materia
    WHERE alumno_id = ?
      AND estado = 'ACEPTADA';
    `,
    [alumnoId],
  );

  const [promedioRows]: any[] = await pool.query(
    `
    SELECT AVG(CAST(nota AS DECIMAL(10,2))) AS promedio
    FROM calificacion
    WHERE alumno_id = ?
      AND tipo = 'FINAL';
    `,
    [alumnoId],
  );

  const [finalesPorMateriaRows]: any[] = await pool.query(
    `
    SELECT
      COUNT(*) AS materias_con_final,
      SUM(CASE WHEN t.best_final >= 6 THEN 1 ELSE 0 END) AS aprobadas,
      SUM(CASE WHEN t.best_final < 6 THEN 1 ELSE 0 END) AS desaprobadas
    FROM (
      SELECT
        c.materia_id,
        MAX(CAST(c.nota AS DECIMAL(10,2))) AS best_final
      FROM calificacion c
      WHERE c.alumno_id = ?
        AND c.tipo = 'FINAL'
      GROUP BY c.materia_id
    ) t;
    `,
    [alumnoId],
  );

  const promedioRaw = promedioRows?.[0]?.promedio;
  const promedioFinal =
    promedioRaw === null || promedioRaw === undefined
      ? null
      : Number(Number(promedioRaw).toFixed(2));

  return {
    institucion: userRows[0].institucion_id
      ? {
          id: Number(userRows[0].institucion_id),
          nombre: String(userRows[0].institucion_nombre),
        }
      : null,
    carrera: userRows[0].carrera_id
      ? {
          id: Number(userRows[0].carrera_id),
          nombre: String(userRows[0].carrera_nombre),
        }
      : null,
    materias: {
      aceptadas: Number(aceptadasRows?.[0]?.total ?? 0),
      aprobadas: Number(finalesPorMateriaRows?.[0]?.aprobadas ?? 0),
      desaprobadas: Number(finalesPorMateriaRows?.[0]?.desaprobadas ?? 0),
    },
    promedio_final: promedioFinal,
  };
}
