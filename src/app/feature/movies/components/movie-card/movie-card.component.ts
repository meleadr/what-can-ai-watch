import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Movie } from '@app/shared/models/movie.model';
import { DatePipe, JsonPipe, PercentPipe, SlicePipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    JsonPipe,
    SlicePipe,
    CardModule,
    ButtonModule,
    RouterLink,
    DatePipe,
    PercentPipe,
  ],
  templateUrl: './movie-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCardComponent {
  movie = input.required<Movie>();
}
