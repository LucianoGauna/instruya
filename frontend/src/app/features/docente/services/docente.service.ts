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

@Injectable({ providedIn: 'root' })
export class DocenteService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/docente/mis-materias';

  getMisMaterias(): Observable<DocenteMisMateriasResponse> {
    return this.http.get<DocenteMisMateriasResponse>(this.apiUrl);
  }
}
