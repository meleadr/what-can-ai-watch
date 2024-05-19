import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MovieCardComponent } from '@app/feature/movies/components/movie-card/movie-card.component';
import { MovieManager } from '@app/shared/managers/movie-manager.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-top-movies',
  standalone: true,
  imports: [MovieCardComponent, AsyncPipe],
  templateUrl: './movie-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListComponent {
  public manager = inject(MovieManager);
}
