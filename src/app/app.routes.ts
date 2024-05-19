import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { Movie } from '@app/shared/models/movie.model';
import { MovieManager } from '@app/shared/managers/movie-manager.service';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export const movieResolver: ResolveFn<Movie> = (
  route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot,
  manager: MovieManager = inject(MovieManager)
): Observable<Movie> => manager.load(+route.paramMap.get('id'));

export const topMovieResolver: ResolveFn<Movie[]> = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot,
  manager: MovieManager = inject(MovieManager)
): Observable<Movie[]> => manager.loadTopRated();

export const routes: Routes = [
  {
    path: 'chat',
    loadComponent: () =>
      import('./feature/chat/chat.component').then(m => m.ChatComponent),
  },
  {
    path: 'movie/top-rated',
    pathMatch: 'full',
    loadComponent: () =>
      import(
        '@app/feature/movies/components/top-movies/top-movies.component'
      ).then(m => m.TopMoviesComponent),
    providers: [MovieManager],
    resolve: { movies: topMovieResolver },
  },
  {
    path: 'movie/:id',
    loadComponent: () =>
      import('@app/feature/movies/movie.component').then(m => m.MovieComponent),
    providers: [MovieManager],
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
