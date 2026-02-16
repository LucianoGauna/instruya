import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DocenteMateria {
  materia_id: number;
  materia_nombre: string;
  carrera_id: number;
  carrera_nombre: string;
}

interface DocenteMisMateriasResponse {
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
}

interface DocenteInscriptosResponse {
  ok: boolean;
  inscriptos: Inscripto[];
}

@Injectable({ providedIn: 'root' })
export class DocenteService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/docente';

  getMisMaterias(): Observable<DocenteMisMateriasResponse> {
    return this.http.get<DocenteMisMateriasResponse>(
      `${this.baseUrl}/mis-materias`
    );
  }

  getInscriptosByMateria(
    materiaId: number
  ): Observable<DocenteInscriptosResponse> {
    return this.http.get<DocenteInscriptosResponse>(
      `${this.baseUrl}/materias/${materiaId}/inscriptos`
    );
  }
}
