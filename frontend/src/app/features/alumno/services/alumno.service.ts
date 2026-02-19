import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type {
  CatalogoCarrera,
  CatalogoMateria,
  MiMateria,
} from '../types/alumno.types';

interface MisMateriasResponse {
  ok: boolean;
  materias: MiMateria[];
}

interface CatalogoMateriasResponse {
  ok: true;
  carrera: CatalogoCarrera;
  materias: CatalogoMateria[];
}

interface SolicitarInscripcionResponse {
  ok: boolean;
  inscripcion: {
    inscripcion_id: number;
    estado: 'PENDIENTE';
  };
}

@Injectable({ providedIn: 'root' })
export class AlumnoService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/alumno';

  getMaterias(): Observable<MisMateriasResponse> {
    return this.http.get<MisMateriasResponse>(`${this.baseUrl}/mis-materias`);
  }

  getCatalogoMaterias(): Observable<CatalogoMateriasResponse> {
    return this.http.get<CatalogoMateriasResponse>(`${this.baseUrl}/materias`);
  }

  solicitarInscripcion(
    materiaId: number
  ): Observable<SolicitarInscripcionResponse> {
    return this.http.post<SolicitarInscripcionResponse>(
      `${this.baseUrl}/materias/${materiaId}/inscribirse`,
      {}
    );
  }
}
