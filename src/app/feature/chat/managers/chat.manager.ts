import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { OpenAiMessage, OpenAiRole } from '../model/chat.model';
import { OpenAiService } from '../services/open-ai.service';

@Injectable()
export class ChatManager {
  public messagesOpenAi$: BehaviorSubject<OpenAiMessage[]> =
    new BehaviorSubject<OpenAiMessage[]>([
      {
        role: OpenAiRole.System,
        content: 'Vous êtes un assistant AI.',
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
        this.addOpenAiMessage({
          role: OpenAiRole.Assistant,
          content: response.choices[0].message.content,
        });
      });
    return true;
  }

  private addOpenAiMessage(message: OpenAiMessage): void {
    this.messagesOpenAi$.next([...this.messagesOpenAi$.value, message]);
  }
}
