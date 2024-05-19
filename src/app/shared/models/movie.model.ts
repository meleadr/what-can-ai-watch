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

export interface MovieDetail extends Movie {
  genres: MovieCategory[];
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

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface MovieCategory {
  id: number;
  name: string;
}
