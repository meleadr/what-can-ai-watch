import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  constructor(private http: HttpClient) {}

  private baseURL = 'https://api.themoviedb.org/3';

  getPopularMovies() {
    return this.http.get(`${this.baseURL}/movie/popular`, {
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
