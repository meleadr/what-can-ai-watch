import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Movie } from '@app/shared/models/movie.model';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Series } from '@app/shared/models/series.model';
import { MovieManager } from '@app/shared/managers/movie.manager';
import { SeriesManager } from './shared/managers/series.manager';

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

export const seriesResolver: ResolveFn<Series> = (
  route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot,
  manager: SeriesManager = inject(SeriesManager)
): Observable<Series> => manager.load(+route.paramMap.get('id'));

export const topSeriesResolver: ResolveFn<Series[]> = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot,
  manager: SeriesManager = inject(SeriesManager)
): Observable<Series[]> => manager.loadTopRated();

export const popularSeriesResolver: ResolveFn<Series[]> = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot,
  manager: SeriesManager = inject(SeriesManager)
): Observable<Series[]> => manager.loadPopular();

export const upcomingSeriesResolver: ResolveFn<Series[]> = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot,
  manager: SeriesManager = inject(SeriesManager)
): Observable<Series[]> => manager.loadUpcoming();
