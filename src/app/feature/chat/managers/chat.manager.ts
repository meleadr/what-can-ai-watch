import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, finalize, switchMap, tap } from 'rxjs';
import { OpenAiMessage, OpenAiRole } from '../model/chat.model';
import { OpenAiService } from '../services/open-ai.service';
import { MOVIE_HELPER_PROMPT } from '@app/shared/constants/prompt.constant';
import { Movie } from '@app/shared/models/movie.model';
import { MovieService } from '@app/shared/services/movie.service';
import { SeriesService } from '@app/shared/services/series.service';
import { Series } from '@app/shared/models/series.model';

@Injectable()
export class ChatManager {
  public messagesOpenAi: BehaviorSubject<OpenAiMessage[]> = new BehaviorSubject<
    OpenAiMessage[]
  >([
    {
      role: OpenAiRole.System,
      content: MOVIE_HELPER_PROMPT,
    },
  ]);
  public movieProposition: BehaviorSubject<Movie> = new BehaviorSubject<Movie>(
    null
  );

  public seriesProposition: BehaviorSubject<Series> =
    new BehaviorSubject<Series>(null);

  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public readonly isLoading$ = this.isLoading.asObservable();

  constructor(
    private service: OpenAiService,
    private movieService: MovieService,
    private seriesService: SeriesService
  ) {}

  public addMessage(message: OpenAiMessage): boolean {
    if (!message.content || this.isLoading.value) return false;
    this.isLoading.next(true);
    this.addOpenAiMessage(message);
    this.addOpenAiMessage({
      content: '',
      isTyping: true,
      role: OpenAiRole.Assistant,
    });

    this.service
      .generateResponse(this.messagesOpenAi.value)
      .pipe(
        finalize(() => this.isLoading.next(false)),
        tap(() =>
          this.messagesOpenAi.next([...this.messagesOpenAi.value.slice(0, -1)])
        ),
        tap(response => this.addOpenAiMessage(response)),
        filter(response => response.title !== null),
        switchMap(response => {
          if (response.isMovie) {
            return this.movieService.searchByQuery(response.title);
          } else {
            return this.seriesService.searchByQuery(response.title);
          }
        }),
        tap(media => {
          if (media instanceof Movie) {
            this.movieProposition.next(media);
          } else {
            this.seriesProposition.next(media);
          }
        })
      )
      .subscribe();
    return true;
  }

  private addOpenAiMessage(message: OpenAiMessage): void {
    this.messagesOpenAi.next([...this.messagesOpenAi.value, message]);
  }
}
