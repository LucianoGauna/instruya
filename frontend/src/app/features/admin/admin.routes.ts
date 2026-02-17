import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/dashboard/admin-dashboard.component';
import { AdminCarrerasComponent } from './pages/admin-carreras/admin-carreras.component';
import { AdminCarreraMateriasComponent } from './pages/admin-carrera-materias/admin-carrera-materias.component';
import { AdminLayoutComponent } from './layout/admin-layout.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'carreras', component: AdminCarrerasComponent },
      {
        path: 'carreras/:id/materias',
        component: AdminCarreraMateriasComponent,
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
];
