import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-top-movies',
  standalone: true,
  imports: [],
  templateUrl: './top-movies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopMoviesComponent {}
