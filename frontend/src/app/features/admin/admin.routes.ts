import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/dashboard/admin-dashboard.component';
import { AdminCarrerasComponent } from './pages/admin-carreras/admin-carreras.component';

export const ADMIN_ROUTES: Routes = [
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'carreras', component: AdminCarrerasComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
