import { Routes } from "@angular/router";
import { DocenteMateriasComponent } from "./pages/mis-materias/docente-materias.component";
import { DocenteInicioComponent } from "./pages/docente-inicio/docente-inicio.component";

export const DOCENTE_ROUTES: Routes = [
  { path: 'inicio', component: DocenteInicioComponent },
  { path: 'mis-materias', component: DocenteMateriasComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
];
