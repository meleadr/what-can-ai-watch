import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { TmdbService } from '@app/shared/services/tmdb.service';
import { AsyncPipe, NgForOf } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { CarouselModule } from 'primeng/carousel';
import { Cast } from '@app/shared/models/credit.model';
import { CarouselResponsiveOptions } from 'primeng/carousel/carousel.interface';
import { TmdbManager } from '@app/shared/managers/tmdb.manager';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [AsyncPipe, ImageModule, NgForOf, CarouselModule],
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieComponent implements OnInit {
  public cast$: Subject<Cast[]> = new Subject<Cast[]>();
  public responsiveOptions!: CarouselResponsiveOptions[];

  constructor(
    public manager: TmdbManager,
    private route: ActivatedRoute,
    private tmdbService: TmdbService
  ) {}

  ngOnInit(): void {
    this.manager.selected$.pipe().subscribe(movie => {
      this.getCastByMovieId(movie.id);
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
    this.tmdbService.fetchCastByIdMovie(id).subscribe(cast => {
      this.cast$.next(cast);
    });
  }
}
