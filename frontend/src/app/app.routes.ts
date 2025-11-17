import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      loadChildren: () => import('../app/features/login/login.routes').then(m => m.LOGIN_ROUTES)
    }
  ];
  
