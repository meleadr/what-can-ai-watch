import { SpokenLanguage } from '@app/shared/models/spoken-language.model';
import { ProductionCompany } from '@app/shared/models/production.model';
import { Genre } from '@app/shared/models/genre.model';

export interface Movie {
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
