import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, Subject, take } from 'rxjs';
import { Cast } from '@app/shared/models/credit.model';
import { CarouselResponsiveOptions } from 'primeng/carousel/carousel.interface';
import { Video } from '@app/shared/models/video.model';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { ImageModule } from 'primeng/image';
import { SharedModule } from 'primeng/api';
import { SeriesManager } from '@app/shared/managers/series.manager';
import { SeriesService } from '@app/shared/services/series.service';

@Component({
  selector: 'app-series-details',
  standalone: true,
  imports: [
    AsyncPipe,
    ButtonModule,
    CarouselModule,
    DatePipe,
    ImageModule,
    SharedModule,
  ],
  templateUrl: './series-details.component.html',
  styleUrl: './series-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeriesDetailsComponent implements OnInit {
  public cast$: Subject<Cast[]> = new Subject<Cast[]>();
  public responsiveOptions!: CarouselResponsiveOptions[];
  public video$: Subject<Video> = new Subject<Video>();

  constructor(
    public manager: SeriesManager,
    private service: SeriesService
  ) {}

  ngOnInit(): void {
    this.manager.selected$.pipe().subscribe(movie => {
      this.getCastById(movie.id);
      this.getVideoById(movie.id);
    });

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  public getCastById(id: number): void {
    this.service
      .fetchCastById(id)
      .pipe(map(cast => cast.slice(0, 10)))
      .subscribe(cast => {
        this.cast$.next(cast);
      });
  }

  public getVideoById(id: number): void {
    this.service
      .fetchVideoById(id)
      .pipe(take(1))
      .subscribe(video => {
        this.video$.next(video);
      });
  }
}
