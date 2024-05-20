import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Series, SeriesDetails } from '../models/series.model';
import { SeriesService } from '@app/shared/services/series.service';

@Injectable()
export class SeriesManager {
  protected readonly _selected: BehaviorSubject<Series | null> =
    new BehaviorSubject<Series | null>(null);
  readonly selected$: Observable<Series | null> = this._selected.asObservable();

  protected readonly _list: BehaviorSubject<Series[] | null> =
    new BehaviorSubject<Series[] | null>(null);
  readonly list$: Observable<Series[] | null> = this._list.asObservable();

  constructor(private service: SeriesService) {}

  public loadTopRated(): Observable<Series[]> {
    return this.service
      .fetchTopRated()
      .pipe(tap(value => this._list.next(value)));
  }

  public loadPopular(): Observable<Series[]> {
    return this.service
      .fetchPopular()
      .pipe(tap(value => this._list.next(value)));
  }

  public loadUpcoming(): Observable<Series[]> {
    return this.service
      .fetchUpcoming()
      .pipe(tap(value => this._list.next(value)));
  }

  public load(id: number): Observable<SeriesDetails> {
    return this.service.findById(id).pipe(tap(value => this.select(value)));
  }

  protected select(value: Series | null = null): void {
    this._selected.next(value);
  }
}
