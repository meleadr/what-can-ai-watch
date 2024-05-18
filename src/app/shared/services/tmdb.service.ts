import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {
  MovieCategory,
  MovieCategoryResponse,
  MovieDetail,
  MovieResponse,
} from '../models/movie.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  constructor(private http: HttpClient) {}

  private baseURL = 'https://api.themoviedb.org/3';

  public fetchMovieById(id: number): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(`${this.baseURL}/movie/${id}`, {
      headers: {
        Authorization: `Bearer ${environment.apiTmdbKey}`,
      },
      params: {
        language: 'fr-FR',
      },
    });
  }

  public fetchSimilarMovies(
    id: number,
    page?: number
  ): Observable<MovieResponse[]> {
    return this.http.get<MovieResponse[]>(
      `${this.baseURL}/movie/${id}/similar`,
      {
        headers: {
          Authorization: `Bearer ${environment.apiTmdbKey}`,
        },
        params: {
          language: 'fr-FR',
          page: page ? page.toString() : '1',
        },
      }
    );
  }

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
