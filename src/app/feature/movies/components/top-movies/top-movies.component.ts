import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MovieCardComponent } from '@app/feature/movies/components/movie-card/movie-card.component';
import { TmdbManager } from '@app/shared/managers/tmdb.manager';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-top-movies',
  standalone: true,
  imports: [MovieCardComponent, AsyncPipe],
  templateUrl: './top-movies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopMoviesComponent {
  public manager = inject(TmdbManager);
}
