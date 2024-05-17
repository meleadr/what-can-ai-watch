import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { TmdbService } from '../../shared/services/tmdb.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterLink],
  templateUrl: './chat.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {
  constructor(private tmdbService: TmdbService) {
    this.tmdbService.getPopularMovies().subscribe(console.log);
  }
}
