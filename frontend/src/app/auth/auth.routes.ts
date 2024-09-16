import { Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { NoAuthGuard } from './guards/noAuth.guard';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        canActivate: [NoAuthGuard],

        loadComponent: () =>
          import('./auth.component').then((m) => m.AuthComponent),
      },


    ],
  },
  {
    path: 'register',
    component: RegisterComponent,
    children: [
      {
        path: '',
        canActivate: [NoAuthGuard],

        loadComponent: () =>
          import('./register/register.component').then((m) => m.RegisterComponent),
      },


    ],
  }
];
