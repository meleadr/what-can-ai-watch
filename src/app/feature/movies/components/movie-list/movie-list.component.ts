import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MovieCardComponent } from '@app/feature/movies/components/movie-card/movie-card.component';
import { MovieManager } from '@app/shared/managers/movie-manager.service';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-top-movies',
  standalone: true,
  imports: [MovieCardComponent, AsyncPipe],
  templateUrl: './movie-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListComponent implements OnInit {
  public manager = inject(MovieManager);
  private route = inject(ActivatedRoute);
  public title$: Observable<string>;

  ngOnInit(): void {
    this.title$ = this.route.data.pipe(map(data => data['title']));
  }
}
