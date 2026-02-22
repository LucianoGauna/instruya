export interface CreateInstitucionBody {
  institucion: {
    nombre: string;
    email: string;
    direccion: string;
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

export interface CreateAdminEnInstitucionBody {
  nombre: string;
  apellido: string;
  email: string;
  contrasenia: string;
}

export type CreateAdminEnInstitucionResult =
  | 'INSTITUCION_NOT_FOUND'
  | 'INSTITUCION_INACTIVA'
  | 'ADMIN_EMAIL_DUP'
  | {
      admin: {
        id: number;
        nombre: string;
        apellido: string;
        email: string;
        rol: 'ADMIN';
        institucion_id: number;
        activo: 1;
      };
    };
