import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
  constructor(private service: OpenAiService) {}

  public addMessage(message: OpenAiMessage): void {
    if (!message.content) return;
    this.addOpenAiMessage(message);

    this.service
      .generateResponse(this.messagesOpenAi$.value)
      .subscribe(response => {
        this.addOpenAiMessage({
          role: OpenAiRole.Assistant,
          content: response.choices[0].message.content,
        });
      });
  }

  private addOpenAiMessage(message: OpenAiMessage): void {
    this.messagesOpenAi$.next([...this.messagesOpenAi$.value, message]);
  }
}
