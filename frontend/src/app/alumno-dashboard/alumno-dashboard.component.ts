import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

type Materia = { nombre: string; carrera: string; periodo: string; estado: 'En curso'|'Aprobada' };
type Noti    = { titulo: string; detalle: string; fecha: string; };

@Component({
  selector: 'app-alumno-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alumno-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlumnoDashboardComponent {
  materias: Materia[] = [
    { nombre: 'Matemática I', carrera: 'Tec. en Programación', periodo: '2025 · 1º cuatr.', estado: 'En curso' },
    { nombre: 'Programación I', carrera: 'Tec. en Programación', periodo: '2025 · 1º cuatr.', estado: 'En curso' },
    { nombre: 'Inglés Técnico', carrera: 'Tec. en Programación', periodo: '2024 · 2º cuatr.', estado: 'Aprobada' },
  ];

  notis: Noti[] = [
    { titulo: 'Inscripción abierta', detalle: '2º cuatrimestre habilitado hasta 15/04.', fecha: '10/03' },
    { titulo: 'Nueva calificación',  detalle: 'Programación I: TP1 cargado.',            fecha: '08/03' },
  ];

  // KPIs fake
  totalAprobadas = 6;
  totalEnCurso  = 2;
  promedio      = 8.4;
}
