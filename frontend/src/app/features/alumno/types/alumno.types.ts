export type EstadoInscripcion = 'PENDIENTE' | 'ACEPTADA' | 'RECHAZADA' | 'BAJA';
export type Periodo = 'PRIMER_CUATRIMESTRE' | 'SEGUNDO_CUATRIMESTRE' | 'ANUAL';

export interface MiMateria {
  inscripcion_id: number;
  estado: EstadoInscripcion;
  fecha: string;
  anio: number | null;
  periodo: Periodo | null;
  materia_id: number;
  materia_nombre: string;
  carrera_id: number;
  carrera_nombre: string;
}

export interface CatalogoInscripcion {
  inscripcion_id: number;
  estado: EstadoInscripcion;
  fecha: string;
  anio: number | null;
  periodo: Periodo | null;
}

export interface CatalogoMateria {
  materia_id: number;
  materia_nombre: string;
  inscripcion: CatalogoInscripcion | null;
}

export interface CatalogoCarrera {
  id: number;
  nombre: string;
}
