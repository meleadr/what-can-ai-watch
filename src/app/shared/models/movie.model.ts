import { SpokenLanguage } from '@app/shared/models/spoken-language.model';
import { ProductionCompany } from '@app/shared/models/production.model';
import { Genre } from '@app/shared/models/genre.model';

export class Movie {
  constructor(movie: Movie) {
    this.id = movie.id;
    this.adult = movie.adult;
    this.backdrop_path = movie.backdrop_path;
    this.genre_ids = movie.genre_ids;
    this.original_language = movie.original_language;
    this.original_title = movie.original_title;
    this.overview = movie.overview;
    this.popularity = movie.popularity;
    this.poster_path = movie.poster_path;
    this.release_date = movie.release_date;
    this.title = movie.title;
    this.video = movie.video;
    this.vote_average = movie.vote_average;
    this.vote_count = movie.vote_count;
  }

  id: number;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  origin_country: string[];
  production_companies: ProductionCompany[];
  spoken_languages: SpokenLanguage[];
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
