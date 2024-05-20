import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
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
