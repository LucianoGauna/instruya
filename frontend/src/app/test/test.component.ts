import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';

interface Rol {
  label: string;
  value: string;
}

type Materia = { nombre: string; carrera: string; periodo: string; alumnos: number; };
type Evento  = { fecha: string; titulo: string; detalle: string; };
type Noti    = { titulo: string; detalle: string; };

@Component({
  selector: 'app-test',
  imports: [ ButtonModule, CardModule, CommonModule, PasswordModule, InputTextModule, SelectModule, FormsModule ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  roles: Rol[] = [
    { label: 'Superadministrador', value: 'SUPERADMIN' },
    { label: 'Administrador de institución', value: 'ADMIN' },
    { label: 'Docente', value: 'DOCENTE' },
    { label: 'Alumno', value: 'ALUMNO' }
  ];

  selectedRol?: Rol;

  nombre = '';
  email = '';
  direccion = '';

    // Dashboard docente
    materias: Materia[] = [
      { nombre: 'Matemática I', carrera: 'Profesorado de Matemática', periodo: '2025 · 1º cuatr.', alumnos: 32 },
      { nombre: 'Didáctica General', carrera: 'Profesorado de Educación Primaria', periodo: '2025 · 1º cuatr.', alumnos: 28 },
      { nombre: 'Algebra', carrera: 'Tecnicatura en Programación', periodo: '2025 · 1º cuatr.', alumnos: 41 },
    ];
  
    eventos: Evento[] = [
      { fecha: '20/03', titulo: 'Clase teórica', detalle: 'Matemática I · Aula 204' },
      { fecha: '27/03', titulo: 'Entrega TP1',   detalle: 'Didáctica General · Campus' },
      { fecha: '03/04', titulo: 'Parcial 1',     detalle: 'Álgebra · Aula 101' },
    ];
  
    notis: Noti[] = [
      { titulo: 'Nuevas inscripciones', detalle: '5 alumnos nuevos en Matemática I.' },
      { titulo: 'Cierre de actas',      detalle: 'Fecha límite 15/04 para 1º cuatr.' },
      { titulo: 'Material subido',      detalle: 'Álgebra: guía de ejercicios actualizada.' },
    ];
}
