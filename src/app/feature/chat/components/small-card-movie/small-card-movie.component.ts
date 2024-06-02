import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { RouterLink } from '@angular/router';
import { Movie } from '@app/shared/models/movie.model';
import { ButtonModule } from 'primeng/button';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-small-card-movie',
  standalone: true,
  imports: [ImageModule, RouterLink, ButtonModule, DatePipe, DecimalPipe],
  templateUrl: './small-card-movie.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmallCardMovieComponent {
  movie = input.required<Movie>();
}
