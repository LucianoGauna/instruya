export const TIPOS_CALIFICACION = [
  'TRABAJO_PRACTICO',
  'PARCIAL',
  'FINAL',
  'NOTA_MATERIA',
] as const;

export type TipoCalificacion = (typeof TIPOS_CALIFICACION)[number];

export function isTipoCalificacion(value: unknown): value is TipoCalificacion {
  return (
    typeof value === 'string' &&
    (TIPOS_CALIFICACION as readonly string[]).includes(value)
  );
}
