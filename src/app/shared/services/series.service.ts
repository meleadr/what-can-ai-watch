import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { map, Observable } from 'rxjs';
import { Cast, Credit } from '../models/credit.model';
import { Video, VideoResponse } from '@app/shared/models/video.model';
import {
  Series,
  SeriesDetails,
  SeriesResponse,
} from '@app/shared/models/series.model';

@Injectable({
  providedIn: 'root',
})
export class SeriesService {
  constructor(private http: HttpClient) {}

  private baseURL = 'https://api.themoviedb.org/3';

  public findById(id: number): Observable<SeriesDetails> {
    return this.http.get<SeriesDetails>(`${this.baseURL}/tv/${id}`, {
      headers: {
        Authorization: `Bearer ${environment.apiTmdbKey}`,
      },
      params: {
        language: 'fr-FR',
      },
    });
  }

  public fetchSimilar(id: number, page?: number): Observable<SeriesResponse[]> {
    return this.http.get<SeriesResponse[]>(`${this.baseURL}/tv/${id}/similar`, {
      headers: {
        Authorization: `Bearer ${environment.apiTmdbKey}`,
      },
      params: {
        language: 'fr-FR',
        page: page ? page.toString() : '1',
      },
    });
  }

  public fetchCastById(id: number): Observable<Cast[]> {
    return this.http
      .get<Credit>(`${this.baseURL}/tv/${id}/credits`, {
        headers: {
          Authorization: `Bearer ${environment.apiTmdbKey}`,
        },
        params: {
          language: 'fr-FR',
        },
      })
      .pipe(map(credit => credit.cast));
  }

  public fetchVideoById(id: number): Observable<Video> {
    return this.http
      .get<VideoResponse>(`${this.baseURL}/tv/${id}/videos`, {
        headers: {
          Authorization: `Bearer ${environment.apiTmdbKey}`,
        },
        params: {
          language: 'fr-FR',
        },
      })
      .pipe(map(response => response.results[0]));
  }

  public fetchTopRated(): Observable<Series[]> {
    return this.http
      .get<SeriesResponse>(`${this.baseURL}/tv/top_rated`, {
        headers: {
          Authorization: `Bearer ${environment.apiTmdbKey}`,
        },
        params: {
          language: 'fr-FR',
        },
      })
      .pipe(map(response => response.results));
  }

  public fetchPopular(): Observable<Series[]> {
    return this.http
      .get<SeriesResponse>(`${this.baseURL}/tv/popular`, {
        headers: {
          Authorization: `Bearer ${environment.apiTmdbKey}`,
        },
        params: {
          language: 'fr-FR',
        },
      })
      .pipe(map(response => response.results));
  }

  public fetchUpcoming(): Observable<Series[]> {
    return this.http
      .get<SeriesResponse>(`${this.baseURL}/tv/on_the_air`, {
        headers: {
          Authorization: `Bearer ${environment.apiTmdbKey}`,
        },
        params: {
          language: 'fr-FR',
        },
      })
      .pipe(map(response => response.results));
  }

  public searchByQuery(query: string): Observable<Series> {
    return this.http
      .get<SeriesResponse>(`${this.baseURL}/search/tv`, {
        headers: {
          Authorization: `Bearer ${environment.apiTmdbKey}`,
        },
        params: {
          language: 'fr-FR',
          query,
        },
      })
      .pipe(map(response => response.results[0]));
  }
}
