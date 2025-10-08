import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./feed-my-baby/feed-my-baby').then(m => m.FeedMyBaby)
  }
];
