import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

type Instituto = {
  nombre: string;
  direccion: string;
  fechaAlta: string;
  admins: number;
};

@Component({
  selector: 'app-instituciones-table',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './instituciones-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstitucionesTableComponent {
  institutos: Instituto[] = [
    { nombre: 'Instituto San Martín',  direccion: 'Av. Libertador 123, CABA',     fechaAlta: '2023-03-12', admins: 2 },
    { nombre: 'Instituto Belgrano',    direccion: 'Calle Mitre 456, Rosario',     fechaAlta: '2023-05-05', admins: 1 },
    { nombre: 'Instituto del Sur',     direccion: 'Av. Independencia 789, Bahía', fechaAlta: '2023-08-20', admins: 3 },
    { nombre: 'Instituto Patria',      direccion: 'Av. Mayo 1000, CABA',          fechaAlta: '2024-01-10', admins: 2 },
    { nombre: 'Instituto Federal',     direccion: 'Calle Rivadavia 222, Córdoba', fechaAlta: '2024-06-02', admins: 1 },
    { nombre: 'Instituto Austral',     direccion: 'Bv. Oroño 990, Rosario',       fechaAlta: '2024-09-14', admins: 2 },
    { nombre: 'Instituto del Norte',   direccion: 'Ruta 9 Km 12, Salta',          fechaAlta: '2024-11-03', admins: 1 },
  ];
}
