import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MovieCategory, MovieCategoryResponse } from '../models/movie.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  constructor(private http: HttpClient) {}

  private baseURL = 'https://api.themoviedb.org/3';

  public fetchAllCategories(): Observable<MovieCategory[]> {
    return this.http
      .get<MovieCategoryResponse>(`${this.baseURL}/genre/movie/list`, {
        headers: {
          Authorization: `Bearer ${environment.apiTmdbKey}`,
        },
        params: {
          language: 'fr-FR',
        },
      })
      .pipe(map(response => response.genres));
  }
}
