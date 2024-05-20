import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DatePipe, PercentPipe } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { Series } from '@app/shared/models/series.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-series-card',
  standalone: true,
  imports: [CardModule, DatePipe, PercentPipe, SharedModule, RouterLink],
  templateUrl: './series-card.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeriesCardComponent {
  series = input.required<Series>();
}
