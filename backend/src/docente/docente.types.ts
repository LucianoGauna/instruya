import type { TipoCalificacion } from './shared/calificaciones.types';

export interface CreateCalificacionInput {
  docenteId: number;
  materiaId: number;
  alumnoId: number;
  tipo: TipoCalificacion;
  fecha: string;
  nota: string;
  descripcion?: string | null;
}

export interface UpdateCalificacionInput {
  docenteId: number;
  calificacionId: number;
  tipo: TipoCalificacion;
  fecha: string;
  nota: string;
  descripcion?: string | null;
}

export type CreateCalificacionResult =
  | 'MATERIA_NOT_FOUND'
  | 'ALUMNO_NO_INSCRIPTO'
  | {
      id: number;
      alumno_id: number;
      materia_id: number;
      tipo: TipoCalificacion;
      fecha: string;
      nota: string;
      descripcion: string | null;
      docente_id: number;
    };

export type UpdateCalificacionResult = 'CALIFICACION_NOT_FOUND' | 'OK';
