export interface CreateInstitucionBody {
  institucion: {
    nombre: string;
    email: string;
    direccion?: string | null;
  };
  admin: {
    nombre: string;
    apellido: string;
    email: string;
    contrasenia: string;
  };
}

export type CreateInstitucionResult =
  | 'INSTITUCION_EMAIL_DUP'
  | 'ADMIN_EMAIL_DUP'
  | {
      institucion: {
        id: number;
        nombre: string;
        email: string;
        direccion: string | null;
        activa: 0 | 1;
      };
      admin: {
        id: number;
        email: string;
      };
    };
