import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, Subject, take } from 'rxjs';
import { TmdbService } from '@app/shared/services/tmdb.service';
import { AsyncPipe, NgForOf } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { CarouselModule } from 'primeng/carousel';
import { Cast } from '@app/shared/models/credit.model';
import { CarouselResponsiveOptions } from 'primeng/carousel/carousel.interface';
import { TmdbManager } from '@app/shared/managers/tmdb.manager';
import { Video } from '@app/shared/models/video';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

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
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieComponent implements OnInit {
  public cast$: Subject<Cast[]> = new Subject<Cast[]>();
  public responsiveOptions!: CarouselResponsiveOptions[];
  public video$: Subject<Video> = new Subject<Video>();

  constructor(
    public manager: TmdbManager,
    private tmdbService: TmdbService
  ) {}

  ngOnInit(): void {
    this.manager.selected$.pipe().subscribe(movie => {
      this.getCastByMovieId(movie.id);
      this.getVideoByMovieId(movie.id);
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

  public getCastByMovieId(id: number): void {
    this.tmdbService
      .fetchCastByIdMovie(id)
      .pipe(map(cast => cast.slice(0, 10)))
      .subscribe(cast => {
        this.cast$.next(cast);
      });
  }

  public getVideoByMovieId(id: number): void {
    this.tmdbService
      .fetchVideoByIdMovie(id)
      .pipe(take(1))
      .subscribe(video => {
        this.video$.next(video);
      });
  }
}
