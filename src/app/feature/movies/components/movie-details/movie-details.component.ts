import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, Subject, take } from 'rxjs';
import { MovieService } from '@app/shared/services/movie.service';
import { AsyncPipe, NgForOf } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { CarouselModule } from 'primeng/carousel';
import { Cast } from '@app/shared/models/credit.model';
import { CarouselResponsiveOptions } from 'primeng/carousel/carousel.interface';
import { Video } from '@app/shared/models/video.model';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MovieManager } from '@app/shared/managers/movie.manager';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [
    AsyncPipe,
    ImageModule,
    NgForOf,
    CarouselModule,
    ButtonModule,
    DialogModule,
  ],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailsComponent implements OnInit {
  public cast$: Subject<Cast[]> = new Subject<Cast[]>();
  public responsiveOptions!: CarouselResponsiveOptions[];
  public video$: Subject<Video> = new Subject<Video>();

  constructor(
    public manager: MovieManager,
    private service: MovieService
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
