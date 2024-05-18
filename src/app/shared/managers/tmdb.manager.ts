import { Injectable } from '@angular/core';
import { MovieCategory } from '../models/movie.model';
import { TmdbService } from '../services/tmdb.service';
import { Subject } from 'rxjs';

@Injectable()
export class TmdbManager {
  public categories$: Subject<MovieCategory[]> = new Subject();
  constructor(private tmdbService: TmdbService) {
    this.tmdbService
      .fetchAllCategories()
      .subscribe(categories => this.categories$.next(categories));
  }
}
