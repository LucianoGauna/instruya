import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

type RegistroAlumno = {
  nombre: string;
  apellido: string;
  dni: string;
  n1: number;
  n2: number;
  n3: number;
};

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './alumnos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MateriaAlumnosTableComponent {
  alumnos: RegistroAlumno[] = [
    { nombre: 'Lucía',   apellido: 'Rossi',   dni: '32.145.987', n1: 8, n2: 7, n3: 9 },
    { nombre: 'Matías',  apellido: 'Gómez',   dni: '38.902.311', n1: 6, n2: 7, n3: 6 },
    { nombre: 'Carla',   apellido: 'Sosa',    dni: '40.221.654', n1: 9, n2: 8, n3: 9 },
    { nombre: 'Julián',  apellido: 'Paz',     dni: '36.778.990', n1: 5, n2: 6, n3: 7 },
    { nombre: 'Sofía',   apellido: 'Molina',  dni: '41.005.331', n1: 7, n2: 8, n3: 7 },
    { nombre: 'Bruno',   apellido: 'Acosta',  dni: '39.113.224', n1: 4, n2: 6, n3: 6 },
    { nombre: 'Micaela', apellido: 'Pérez',   dni: '37.889.456', n1: 10, n2: 9, n3: 10 },
  ];
}
