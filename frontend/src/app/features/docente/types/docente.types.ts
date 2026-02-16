export interface DocenteMateria {
  materia_id: number;
  materia_nombre: string;
  carrera_id: number;
  carrera_nombre: string;
}

export interface DocenteMisMateriasResponse {
  ok: boolean;
  materias: DocenteMateria[];
}

export interface Inscripto {
  alumno_id: number;
  nombre: string;
  apellido: string;
  email: string;
  estado: 'PENDIENTE' | 'ACEPTADA' | 'RECHAZADA' | 'BAJA';
  anio: number | null;
  periodo: 'PRIMER_CUATRIMESTRE' | 'SEGUNDO_CUATRIMESTRE' | 'ANUAL' | null;
  calificaciones: Calificacion[];
}

export interface DocenteInscriptosResponse {
  ok: boolean;
  inscriptos: Inscripto[];
}

export type TipoCalificacion =
  | 'TRABAJO_PRACTICO'
  | 'PARCIAL'
  | 'FINAL'
  | 'NOTA_MATERIA';

export interface Calificacion {
  calificacion_id: number;
  alumno_id: number;
  materia_id: number;
  tipo: TipoCalificacion;
  fecha: string;
  nota: string;
  descripcion: string | null;
  created_at: string;
}
