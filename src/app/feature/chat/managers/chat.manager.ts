import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message } from '../model/chat.model';
import { ChatService } from '../services/chat.service';

@Injectable()
export class ChatManager {
  public messages$: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>(
    []
  );
  constructor(private chatService: ChatService) {}

  public addMessage(message: Message): void {
    if (!message.content) return;
    const responseMessage = {
      content: 'I am a bot',
      sender: false,
      timestamp: new Date(),
    };
    this.messages$.next([...this.messages$.value, message, responseMessage]);
  }
}
