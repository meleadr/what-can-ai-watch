import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'chat',
    loadComponent: () =>
      import('./feature/chat/chat.component').then(m => m.ChatComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./landing/landing.component').then(m => m.LandingComponent),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./shared/components/not-found/not-found.component').then(
        m => m.NotFoundComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
