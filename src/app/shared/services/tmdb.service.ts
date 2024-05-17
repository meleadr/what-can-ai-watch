import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MovieResponse } from '../models/movie.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  constructor(private http: HttpClient) {}

  private baseURL = 'https://api.themoviedb.org/3';

  public getPopularMovies(): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.baseURL}/movie/popular`, {
      headers: {
        Authorization: `Bearer ${environment.apiTmdbKey}`,
      },
      params: {
        language: 'fr-FR',
        page: '1',
      },
    });
  }
}
