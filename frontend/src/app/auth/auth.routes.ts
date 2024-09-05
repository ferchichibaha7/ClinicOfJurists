import { Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./auth.component').then((m) => m.AuthComponent),
      }

    ],
  }
];
