import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../shared/models/movie.model';
import { Subject } from 'rxjs';
import { TmdbService } from '../../shared/services/tmdb.service';
import { AsyncPipe, NgForOf } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { CarouselModule } from 'primeng/carousel';
import { Cast } from '../../shared/models/credit.model';
import { CarouselResponsiveOptions } from 'primeng/carousel/carousel.interface';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [AsyncPipe, ImageModule, NgForOf, CarouselModule],
  templateUrl: './movie.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieComponent implements OnInit {
  public movie$: Subject<Movie> = new Subject<Movie>();
  public cast$: Subject<Cast[]> = new Subject<Cast[]>();
  public responsiveOptions!: CarouselResponsiveOptions[];

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.getMovie(id);
      this.getCastByMovieId(id);
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

  public getMovie(id: number): void {
    this.tmdbService.fetchMovieById(id).subscribe(movie => {
      this.movie$.next(movie);
    });
  }

  public getCastByMovieId(id: number): void {
    this.tmdbService.fetchCastByIdMovie(id).subscribe(cast => {
      this.cast$.next(cast);
    });
  }
}
