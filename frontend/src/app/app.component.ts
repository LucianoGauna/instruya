import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestComponent } from './test/test.component';
import { InstitucionesTableComponent } from './instituciones-table/instituciones-table.component';
import { AlumnosTableComponent } from './alumnos-table/alumnos-table.component';
import { CrearCarreraDialogComponent } from './nueva-carrera-dialog/nueva-carrera-dialog.component';
import { MateriaAlumnosTableComponent } from './docente/alumnos/alumnos.component';
import { AlumnoDashboardComponent } from './alumno-dashboard/alumno-dashboard.component';
import { AlumnoCalificacionesTableComponent } from "./alumno-calificaciones-table/alumno-calificaciones-table.component";
import { ConfirmActionDialogComponent } from "./confirm-action-dialog/confirm-action-dialog.component";
import { ToastDemoComponent } from "./toast-demo/toast-demo.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TestComponent,
    InstitucionesTableComponent,
    AlumnosTableComponent,
    CrearCarreraDialogComponent,
    MateriaAlumnosTableComponent,
    AlumnoDashboardComponent,
    AlumnoCalificacionesTableComponent,
    ConfirmActionDialogComponent,
    ToastDemoComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'instruya';
}
