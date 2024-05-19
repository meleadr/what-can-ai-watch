import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChatManager } from './managers/chat.manager';
import { OpenAiMessage, OpenAiRole } from './model/chat.model';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    RouterLink,
    InputTextModule,
    InputGroupModule,
    FormsModule,
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
  providers: [ChatManager],
})
export class ChatComponent implements AfterViewChecked {
  @ViewChildren('messageDiv') private messages!: QueryList<ElementRef>;

  public manager = inject(ChatManager);
  public inputValue: string;
  protected readonly OpenAiRole = OpenAiRole;

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    const lastMessage = this.messages.last;

    if (lastMessage) {
      lastMessage.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  sendMessage(): void {
    if (this.inputValue === '') return;

    const message: OpenAiMessage = {
      content: this.inputValue,
      role: OpenAiRole.User,
    };

    const isAdded = this.manager.addMessage(message);
    if (isAdded) {
      this.inputValue = '';
    }
  }
}
