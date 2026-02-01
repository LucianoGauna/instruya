import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

function homeRouteForRole(rol: string): string {
  switch (rol) {
    case 'SUPERADMIN':
      return '/superadmin/dashboard';
    case 'ADMIN':
      return '/admin/dashboard';
    case 'DOCENTE':
      return '/docente/mis-materias';
    case 'ALUMNO':
      return '/alumno/inicio';
    default:
      return '/';
  }
}

export function roleGuard(allowedRoles: string[]): CanActivateFn {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (!auth.isLoggedIn()) {
      router.navigate(['/']);
      return false;
    }

    const user = auth.user();

    if (!user) {
      router.navigate(['/']);
      return false;
    }

    // Si el rol NO está permitido
    if (!allowedRoles.includes(user.rol)) {
      router.navigate([homeRouteForRole(user.rol)]);
      return false;
    }

    return true;
  };
}
