import { Injectable } from '@angular/core';
import { Movie, MovieCategory } from '../models/movie.model';
import { TmdbService } from '../services/tmdb.service';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';

@Injectable()
export class TmdbManager {
  public categories$: Subject<MovieCategory[]> = new Subject();
  protected readonly _selected: BehaviorSubject<Movie | null> =
    new BehaviorSubject<Movie | null>(null);
  readonly selected$: Observable<Movie | null> = this._selected.asObservable();

  protected readonly _list: BehaviorSubject<Movie[] | null> =
    new BehaviorSubject<Movie[] | null>(null);
  readonly list$: Observable<Movie[] | null> = this._list.asObservable();

  constructor(private service: TmdbService) {
    this.service
      .fetchAllCategories()
      .subscribe(categories => this.categories$.next(categories));
  }

  public loadTopRated(): Observable<Movie[]> {
    return this.service
      .fetchTopRated()
      .pipe(tap(value => this._list.next(value)));
  }

  public load(id: number): Observable<Movie> {
    return this.service.findById(id).pipe(tap(value => this.select(value)));
  }

  protected select(value: Movie | null = null): void {
    this._selected.next(value);
  }
}
