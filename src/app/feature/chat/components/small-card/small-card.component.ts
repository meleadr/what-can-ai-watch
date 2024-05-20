import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { RouterLink } from '@angular/router';
import { Movie } from '@app/shared/models/movie.model';

@Component({
  selector: 'app-small-card',
  standalone: true,
  imports: [ImageModule, RouterLink],
  templateUrl: './small-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmallCardComponent {
  movie = input.required<Movie>();
}
