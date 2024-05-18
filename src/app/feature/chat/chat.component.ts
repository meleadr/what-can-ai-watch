import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { TmdbService } from '@app/shared/services/tmdb.service';
import { CommonModule } from '@angular/common';
import { TmdbManager } from '@app/shared/managers/tmdb.manager';
import { ChatManager } from './managers/chat.manager';
import { Message } from './model/chat.model';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    RouterLink,
    InputTextModule,
    InputGroupModule,
  ],
  styles: [
    `
      .message-container {
        overflow-y: auto;
      }
    `,
  ],
  templateUrl: './chat.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TmdbManager, ChatManager],
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChildren('messageDiv') private messages!: QueryList<ElementRef>;
  constructor(
    private tmdbService: TmdbService,
    private tmdbManager: TmdbManager,
    public chatManager: ChatManager
  ) {}

  ngOnInit(): void {
    this.tmdbManager.categories$.subscribe(console.log);
    this.tmdbService.findById(2).subscribe(console.log);
    this.tmdbService.findById(2).subscribe(console.log);
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    const lastMessage = this.messages.last;

    if (lastMessage) {
      lastMessage.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  sendMessage(content: string): void {
    const message: Message = {
      content,
      sender: true,
      timestamp: new Date(),
    };

    this.chatManager.addMessage(message);
  }
}
