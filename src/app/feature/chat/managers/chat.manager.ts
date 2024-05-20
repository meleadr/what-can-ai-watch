import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { OpenAiMessage, OpenAiRole } from '../model/chat.model';
import { OpenAiService } from '../services/open-ai.service';
import { MOVIE_HELPER_PROMPT } from '@app/shared/constants/prompt.constant';

@Injectable()
export class ChatManager {
  public messagesOpenAi$: BehaviorSubject<OpenAiMessage[]> =
    new BehaviorSubject<OpenAiMessage[]>([
      {
        role: OpenAiRole.System,
        content: MOVIE_HELPER_PROMPT,
      },
    ]);

  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public readonly isLoading$ = this.isLoading.asObservable();

  constructor(private service: OpenAiService) {}

  public addMessage(message: OpenAiMessage): boolean {
    if (!message.content || this.isLoading.value) return false;
    this.isLoading.next(true);
    this.addOpenAiMessage(message);

    this.service
      .generateResponse(this.messagesOpenAi$.value)
      .pipe(finalize(() => this.isLoading.next(false)))
      .subscribe(response => {
        this.addOpenAiMessage(response);
      });
    return true;
  }

  private addOpenAiMessage(message: OpenAiMessage): void {
    this.messagesOpenAi$.next([...this.messagesOpenAi$.value, message]);
  }
}
