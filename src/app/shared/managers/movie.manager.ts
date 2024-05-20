import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';
import { MovieService } from '../services/movie.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable()
export class MovieManager {
  protected readonly _selected: BehaviorSubject<Movie | null> =
    new BehaviorSubject<Movie | null>(null);
  readonly selected$: Observable<Movie | null> = this._selected.asObservable();

  protected readonly _list: BehaviorSubject<Movie[] | null> =
    new BehaviorSubject<Movie[] | null>(null);
  readonly list$: Observable<Movie[] | null> = this._list.asObservable();

  constructor(private service: MovieService) {}

  public loadTopRated(): Observable<Movie[]> {
    return this.service
      .fetchTopRated()
      .pipe(tap(value => this._list.next(value)));
  }

  public loadPopular(): Observable<Movie[]> {
    return this.service
      .fetchPopular()
      .pipe(tap(value => this._list.next(value)));
  }

  public loadUpcoming(): Observable<Movie[]> {
    return this.service
      .fetchUpcoming()
      .pipe(tap(value => this._list.next(value)));
  }

  public load(id: number): Observable<Movie> {
    return this.service.findById(id).pipe(tap(value => this.select(value)));
  }

  protected select(value: Movie | null = null): void {
    this._selected.next(value);
  }
}
