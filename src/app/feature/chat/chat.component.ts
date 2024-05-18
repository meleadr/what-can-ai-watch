import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { TmdbService } from '../../shared/services/tmdb.service';
import { CommonModule } from '@angular/common';
import { TmdbManager } from '../../shared/managers/tmdb.manager';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterLink],
  templateUrl: './chat.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TmdbManager],
})
export class ChatComponent implements OnInit {
  constructor(
    private tmdbService: TmdbService,
    private tmdbManager: TmdbManager
  ) {}

  ngOnInit(): void {
    this.tmdbManager.categories$.subscribe(console.log);
  }
}
