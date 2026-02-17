export type EstadoInscripcion = 'PENDIENTE' | 'ACEPTADA' | 'RECHAZADA' | 'BAJA';
export type Periodo = 'PRIMER_CUATRIMESTRE' | 'SEGUNDO_CUATRIMESTRE' | 'ANUAL';

export interface MateriaCatalogo {
  materia_id: number;
  materia_nombre: string;
  inscripcion: null | {
    inscripcion_id: number;
    estado: EstadoInscripcion;
    fecha: string;
    anio: number | null;
    periodo: Periodo | null;
  };
}

export interface MateriasCatalogoResponse {
  ok: true;
  carrera: { id: number; nombre: string };
  materias: MateriaCatalogo[];
}

export type GetCatalogoResult = 'ALUMNO_SIN_CARRERA' | MateriasCatalogoResponse;

export type InscribirseResult =
  | 'ALUMNO_SIN_CARRERA'
  | 'MATERIA_NOT_FOUND'
  | 'YA_INSCRIPTO'
  | { inscripcion_id: number; estado: 'PENDIENTE' };
