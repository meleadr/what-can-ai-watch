import { Routes } from '@angular/router';
import { MovieManager } from '@app/shared/managers/movie-manager.service';
import {
  movieResolver,
  popularMovieResolver,
  topMovieResolver,
  upcomingMovieResolver,
} from '@app/resolver.constant';

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
