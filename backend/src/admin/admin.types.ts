export type CreateMateriaResult =
| 'CARRERA_NOT_FOUND'
| 'DOCENTE_NOT_FOUND'
| { id: number; nombre: string; carrera_id: number; docente_id: number };