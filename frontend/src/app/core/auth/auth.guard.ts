import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Si NO hay sesión, redirigir al login
  if (!auth.isLoggedIn()) {
    router.navigate(['/']);
    return false;
  }

  // Si hay sesión, permitir acceso
  return true;
};
