import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import {
  Movie,
  MovieCategory,
  MovieCategoryResponse,
  MovieDetail,
  MovieResponse,
} from '../models/movie.model';
import { map, Observable } from 'rxjs';
import { Cast, Credit } from '../models/credit.model';
import { Video, VideoResponse } from '@app/shared/models/video';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  constructor(private http: HttpClient) {}

  private baseURL = 'https://api.themoviedb.org/3';

  public findById(id: number): Observable<MovieDetail> {
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

  public fetchCastByIdMovie(id: number): Observable<Cast[]> {
    return this.http
      .get<Credit>(`${this.baseURL}/movie/${id}/credits`, {
        headers: {
          Authorization: `Bearer ${environment.apiTmdbKey}`,
        },
        params: {
          language: 'fr-FR',
        },
      })
      .pipe(map(credit => credit.cast));
  }

  public fetchVideoByIdMovie(id: number): Observable<Video> {
    return this.http
      .get<VideoResponse>(`${this.baseURL}/movie/${id}/videos`, {
        headers: {
          Authorization: `Bearer ${environment.apiTmdbKey}`,
        },
        params: {
          language: 'fr-FR',
        },
      })
      .pipe(map(response => response.results[0]));
  }

  public fetchTopRated(): Observable<Movie[]> {
    return this.http
      .get<MovieResponse>(`${this.baseURL}/movie/top_rated`, {
        headers: {
          Authorization: `Bearer ${environment.apiTmdbKey}`,
        },
        params: {
          language: 'fr-FR',
        },
      })
      .pipe(map(response => response.results));
  }

  public fetchPopular(): Observable<Movie[]> {
    return this.http
      .get<MovieResponse>(`${this.baseURL}/movie/popular`, {
        headers: {
          Authorization: `Bearer ${environment.apiTmdbKey}`,
        },
        params: {
          language: 'fr-FR',
        },
      })
      .pipe(map(response => response.results));
  }

  public fetchUpcoming(): Observable<Movie[]> {
    return this.http
      .get<MovieResponse>(`${this.baseURL}/movie/upcoming`, {
        headers: {
          Authorization: `Bearer ${environment.apiTmdbKey}`,
        },
        params: {
          language: 'fr-FR',
        },
      })
      .pipe(map(response => response.results));
  }
}
