import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

type Calificacion = {
  materia: string;
  cuatrimestre: string;   // ej: "2025 · 1º"
  docente: string;
  fechaInicio: string;    // ISO "YYYY-MM-DD"
  n1: number;
  n2: number;
  n3: number;
};

@Component({
  selector: 'app-alumno-calificaciones-table',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './alumno-calificaciones-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlumnoCalificacionesTableComponent {
  califs: Calificacion[] = [
    { materia: 'Matemática I',        cuatrimestre: '2025 · 1º', docente: 'M. Fernández', fechaInicio: '2025-03-10', n1: 8,  n2: 7,  n3: 9  },
    { materia: 'Programación I',      cuatrimestre: '2025 · 1º', docente: 'L. Navarro',   fechaInicio: '2025-03-11', n1: 9,  n2: 8,  n3: 8  },
    { materia: 'Inglés Técnico',      cuatrimestre: '2024 · 2º', docente: 'C. Duarte',    fechaInicio: '2024-08-12', n1: 7,  n2: 8,  n3: 9  },
    { materia: 'Álgebra',             cuatrimestre: '2025 · 1º', docente: 'S. Romero',    fechaInicio: '2025-03-12', n1: 6,  n2: 7,  n3: 7  },
    { materia: 'Arquitectura de PCs', cuatrimestre: '2024 · 2º', docente: 'V. Téllez',    fechaInicio: '2024-08-15', n1: 10, n2: 9,  n3: 10 },
    { materia: 'Bases de Datos I',    cuatrimestre: '2025 · 1º', docente: 'R. Ponce',     fechaInicio: '2025-03-09', n1: 5,  n2: 6,  n3: 7  },
    { materia: 'Lógica',              cuatrimestre: '2024 · 2º', docente: 'E. Martins',   fechaInicio: '2024-08-20', n1: 8,  n2: 8,  n3: 8  },
  ];
}
