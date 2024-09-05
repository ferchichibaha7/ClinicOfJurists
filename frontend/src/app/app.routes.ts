import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.routes),
  },
  {
    path: 'home',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
];
