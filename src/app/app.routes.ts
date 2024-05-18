import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { Movie } from '@app/shared/models/movie.model';
import { TmdbManager } from '@app/shared/managers/tmdb.manager';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export const movieResolver: ResolveFn<Movie> = (
  route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot,
  tmdbManager: TmdbManager = inject(TmdbManager)
): Observable<Movie> => tmdbManager.load(+route.paramMap.get('id'));

export const routes: Routes = [
  {
    path: 'chat',
    loadComponent: () =>
      import('./feature/chat/chat.component').then(m => m.ChatComponent),
  },
  {
    path: 'movie/:id',
    loadComponent: () =>
      import('./feature/movie/movie.component').then(m => m.MovieComponent),
    providers: [TmdbManager],
    resolve: { movie: movieResolver },
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
