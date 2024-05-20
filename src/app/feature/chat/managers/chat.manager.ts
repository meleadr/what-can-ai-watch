import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, finalize, switchMap, tap } from 'rxjs';
import { OpenAiMessage, OpenAiRole } from '../model/chat.model';
import { OpenAiService } from '../services/open-ai.service';
import { MOVIE_HELPER_PROMPT } from '@app/shared/constants/prompt.constant';
import { Movie } from '@app/shared/models/movie.model';
import { TmdbService } from '@app/shared/services/tmdb.service';

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

  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public readonly isLoading$ = this.isLoading.asObservable();

  constructor(
    private service: OpenAiService,
    private tmdbService: TmdbService
  ) {}

  public addMessage(message: OpenAiMessage): boolean {
    if (!message.content || this.isLoading.value) return false;
    this.isLoading.next(true);
    this.addOpenAiMessage(message);

    this.service
      .generateResponse(this.messagesOpenAi.value)
      .pipe(
        finalize(() => this.isLoading.next(false)),
        tap(response => this.addOpenAiMessage(response)),
        filter(response => response.title !== null),
        switchMap(response =>
          this.tmdbService.searchMovieByQuery(response.title)
        ),
        tap(movie => this.movieProposition.next(movie))
      )
      .subscribe();
    return true;
  }

  private addOpenAiMessage(message: OpenAiMessage): void {
    this.messagesOpenAi.next([...this.messagesOpenAi.value, message]);
  }
}
