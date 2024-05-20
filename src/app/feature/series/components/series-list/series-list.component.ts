import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MovieCardComponent } from '@app/feature/movies/components/movie-card/movie-card.component';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { SeriesManager } from '@app/shared/managers/series.manager';
import { SeriesCardComponent } from '@app/feature/series/components/series-card/series-card.component';

@Component({
  selector: 'app-series-list',
  standalone: true,
  imports: [AsyncPipe, MovieCardComponent, SeriesCardComponent],
  templateUrl: './series-list.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeriesListComponent implements OnInit {
  public manager = inject(SeriesManager);
  private route = inject(ActivatedRoute);
  public title$: Observable<string>;

  ngOnInit(): void {
    this.title$ = this.route.data.pipe(map(data => data['title']));
  }
}
