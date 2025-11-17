import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

type Alumno = {
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  direccion: string;
  telefono: string;
  instituto: string;
};

@Component({
  selector: 'app-alumnos-table',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './alumnos-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlumnosTableComponent {
  alumnos: Alumno[] = [
    { nombre: 'Lucía',   apellido: 'Rossi',   dni: '32.145.987', email: 'lucia.rossi@mail.com',   direccion: 'Av. Rivadavia 1020, CABA',  telefono: '11-5555-1001', instituto: 'Instituto San Martín' },
    { nombre: 'Matías',  apellido: 'Gómez',   dni: '38.902.311', email: 'matias.gomez@mail.com',  direccion: 'Mitre 455, Rosario',        telefono: '341-456-7788', instituto: 'Instituto Belgrano'   },
    { nombre: 'Carla',   apellido: 'Sosa',    dni: '40.221.654', email: 'carla.sosa@mail.com',    direccion: 'Belgrano 230, Córdoba',     telefono: '351-432-1122', instituto: 'Instituto Federal'    },
    { nombre: 'Julián',  apellido: 'Paz',     dni: '36.778.990', email: 'julian.paz@mail.com',     direccion: 'Av. Libertad 890, Bahía',   telefono: '291-422-5566', instituto: 'Instituto del Sur'    },
    { nombre: 'Sofía',   apellido: 'Molina',  dni: '41.005.331', email: 'sofia.molina@mail.com',   direccion: 'Sarmiento 700, Salta',      telefono: '387-444-2211', instituto: 'Instituto del Norte'  },
    { nombre: 'Bruno',   apellido: 'Acosta',  dni: '39.113.224', email: 'bruno.acosta@mail.com',   direccion: 'Av. San Juan 1500, CABA',   telefono: '11-5555-2002', instituto: 'Instituto Patria'     },
    { nombre: 'Micaela', apellido: 'Pérez',   dni: '37.889.456', email: 'mica.perez@mail.com',     direccion: 'Bv. Oroño 950, Rosario',    telefono: '341-455-6677', instituto: 'Instituto Austral'    },
  ];
}
