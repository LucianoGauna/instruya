import { Routes } from '@angular/router';
import { AlumnoInicioComponent } from './pages/inicio/alumno-inicio.component';

export const ALUMNO_ROUTES: Routes = [
  { path: 'inicio', component: AlumnoInicioComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
];
