export type CreateMateriaResult =
  | 'CARRERA_NOT_FOUND'
  | 'DOCENTE_NOT_FOUND'
  | { id: number; nombre: string; carrera_id: number; docente_id: number };

export type UpdateMateriaResult =
  | 'DOCENTE_NOT_FOUND'
  | 'MATERIA_NOT_FOUND'
  | 'OK';
