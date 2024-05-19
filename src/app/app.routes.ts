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

export const popularMovieResolver: ResolveFn<Movie[]> = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot,
  manager: MovieManager = inject(MovieManager)
): Observable<Movie[]> => manager.loadPopular();

export const upcomingMovieResolver: ResolveFn<Movie[]> = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot,
  manager: MovieManager = inject(MovieManager)
): Observable<Movie[]> => manager.loadUpcoming();

export const movieRoutes: Routes = [
  {
    path: 'top-rated',
    pathMatch: 'full',
    loadComponent: () =>
      import(
        '@app/feature/movies/components/movie-list/movie-list.component'
      ).then(m => m.MovieListComponent),
    providers: [MovieManager],
    resolve: { movies: topMovieResolver },
    data: { title: 'Les mieux notés' },
  },
  {
    path: 'popular',
    pathMatch: 'full',
    loadComponent: () =>
      import(
        '@app/feature/movies/components/movie-list/movie-list.component'
      ).then(m => m.MovieListComponent),
    providers: [MovieManager],
    resolve: { movies: popularMovieResolver },
    data: { title: 'Les plus populaires' },
  },
  {
    path: 'upcoming',
    pathMatch: 'full',
    loadComponent: () =>
      import(
        '@app/feature/movies/components/movie-list/movie-list.component'
      ).then(m => m.MovieListComponent),
    providers: [MovieManager],
    resolve: { movies: upcomingMovieResolver },
    data: { title: 'Les prochaines sorties' },
  },
  {
    path: ':id',
    loadComponent: () =>
      import(
        '@app/feature/movies/components/movie-details/movie-details.component'
      ).then(m => m.MovieDetailsComponent),
    providers: [MovieManager],
    resolve: { movie: movieResolver },
  },
];

export const routes: Routes = [
  {
    path: 'chat',
    loadComponent: () =>
      import('./feature/chat/chat.component').then(m => m.ChatComponent),
  },
  {
    path: 'movie',
    children: movieRoutes,
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
