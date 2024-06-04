import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Series } from '@app/shared/models/series.model';
import { ImageModule } from 'primeng/image';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-small-card-series',
  standalone: true,
  imports: [ImageModule, RouterLink, ButtonModule, DatePipe],
  templateUrl: './small-card-series.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmallCardSeriesComponent {
  series = input.required<Series>();
}
