import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { roleGuard } from './core/auth/role.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/login/login.routes').then((m) => m.LOGIN_ROUTES),
  },
  {
    path: 'superadmin',
    canActivate: [authGuard, roleGuard(['SUPERADMIN'])],
    loadChildren: () =>
      import('./features/superadmin/superadmin.routes').then(
        (m) => m.SUPERADMIN_ROUTES
      ),
  },
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard(['ADMIN'])],
    loadChildren: () =>
      import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  {
    path: 'docente',
    canActivate: [authGuard, roleGuard(['DOCENTE'])],
    loadChildren: () =>
      import('./features/docente/docente.routes').then((m) => m.DOCENTE_ROUTES),
  },
  {
    path: 'alumno',
    canActivate: [authGuard, roleGuard(['ALUMNO'])],
    loadChildren: () =>
      import('./features/alumno/alumno.routes').then((m) => m.ALUMNO_ROUTES),
  },
  { path: '**', redirectTo: '' },
];
