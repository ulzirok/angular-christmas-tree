import { Routes } from '@angular/router';
import { Main } from './core/components/main/main';

export const routes: Routes = [
  { path: '', component: Main },
  {
    path: 'toys',
    loadChildren: () => import('../app/features/toys/toys.routes').then((m) => m.TOYS_ROUTES),
  },
  {
    path: 'tree',
    loadChildren: () => import('../app/features/tree/tree.routes').then((m) => m.TREE_ROUTES),
  },
];
