import { Routes } from '@angular/router';
import { AlumnoInicioComponent } from './pages/inicio/alumno-inicio.component';
import { AlumnoMisMateriasComponent } from './pages/mis-materias/mis-materias.component';

export const ALUMNO_ROUTES: Routes = [
  { path: 'inicio', component: AlumnoInicioComponent },
  { path: 'mis-materias', component: AlumnoMisMateriasComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
];
