import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { CategoryListComponent } from '../quiz/category-list/category-list.component';
import { SubcategoryListComponent } from '../quiz/subcategory-list/subcategory-list.component';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
       redirectTo: '/home',
      pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),
      },

      {
        path: 'tab2',
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },

  {
    path: 'quiz',
    component: CategoryListComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),
      }
    ],
  },

  {
    path: 'categories/:categoryId/subcategories',
    component: SubcategoryListComponent,
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];
