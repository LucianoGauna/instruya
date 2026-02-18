export type CreateMateriaResult =
  | 'CARRERA_NOT_FOUND'
  | 'DOCENTE_NOT_FOUND'
  | { id: number; nombre: string; carrera_id: number; docente_id: number };

export type UpdateMateriaResult =
  | 'DOCENTE_NOT_FOUND'
  | 'MATERIA_NOT_FOUND'
  | 'OK';

export type Periodo = 'PRIMER_CUATRIMESTRE' | 'SEGUNDO_CUATRIMESTRE' | 'ANUAL';

export const PERIODOS_VALIDOS = new Set<Periodo>([
  'PRIMER_CUATRIMESTRE',
  'SEGUNDO_CUATRIMESTRE',
  'ANUAL',
]);

export interface InscripcionPendiente {
  inscripcion_id: number;

  alumno_id: number;
  alumno_nombre: string;
  alumno_apellido: string;
  alumno_email: string;
  legajo: string | null;
  cohorte: number | null;

  materia_id: number;
  materia_nombre: string;

  carrera_id: number;
  carrera_nombre: string;

  fecha: string;
  created_at: string;
}

export interface AdminInscriptosPendientesResponse {
  ok: true;
  pendientes: InscripcionPendiente[];
}

export interface AceptarInscripcionBody {
  anio: number;
  periodo: Periodo;
}
