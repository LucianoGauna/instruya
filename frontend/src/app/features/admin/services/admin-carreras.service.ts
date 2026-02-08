import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Carrera {
  id: number;
  nombre: string;
  activa: number;     
  created_at: string;
}

interface CarrerasResponse {
  ok: boolean;
  carreras: Carrera[];
}

@Injectable({ providedIn: 'root' })
export class AdminCarrerasService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/admin/carreras';

  getCarreras(): Observable<CarrerasResponse> {
    return this.http.get<CarrerasResponse>(this.apiUrl);
  }
}
