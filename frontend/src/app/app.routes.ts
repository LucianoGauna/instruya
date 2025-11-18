import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/login/login.routes').then(m => m.LOGIN_ROUTES),
  },
  {
    path: 'superadmin',
    loadChildren: () =>
      import('./features/superadmin/superadmin.routes').then(m => m.SUPERADMIN_ROUTES),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES),
  },
  {
    path: 'docente',
    loadChildren: () =>
      import('./features/docente/docente.routes').then(m => m.DOCENTE_ROUTES),
  },
  {
    path: 'alumno',
    loadChildren: () =>
      import('./features/alumno/alumno.routes').then(m => m.ALUMNO_ROUTES),
  }
];
