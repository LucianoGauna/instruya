import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { MiMateria } from '../types/alumno.types';

interface MisMateriasResponse {
  ok: boolean;
  materias: MiMateria[];
}

@Injectable({ providedIn: 'root' })
export class AlumnoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/alumno/mis-materias';

  getMisMaterias(): Observable<MisMateriasResponse> {
    return this.http.get<MisMateriasResponse>(this.apiUrl);
  }
}
