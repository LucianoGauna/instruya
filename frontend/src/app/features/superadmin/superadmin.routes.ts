import { Routes } from '@angular/router';
import { SuperadminDashboardComponent } from './pages/dashboard/superadmin-dashboard.component';

export const SUPERADMIN_ROUTES: Routes = [
  { path: 'dashboard', component: SuperadminDashboardComponent },
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
];
