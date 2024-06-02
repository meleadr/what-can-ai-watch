import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
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
import { FilterPipe } from '@app/shared/pipes/filter.pipe';
import { ImageModule } from 'primeng/image';
import { SmallCardMovieComponent } from '@app/feature/chat/components/small-card-movie/small-card-movie.component';
import { SmallCardSeriesComponent } from '@app/feature/chat/components/small-card-series/small-card-series.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    RouterLink,
    InputTextModule,
    InputGroupModule,
    FilterPipe,
    FormsModule,
    ImageModule,
    SmallCardMovieComponent,
    SmallCardSeriesComponent,
    ProgressSpinnerModule,
  ],
  styles: [
    `
      .message-container {
        overflow-y: auto;
      }

      .typing-dot {
        float: left;
        width: 8px;
        height: 8px;
        margin: 0 4px;
        background: #8d8c91;
        border-radius: 50%;
        opacity: 0;
        animation: loadingFade 1s infinite;
      }

      .typing-dot:nth-child(1) {
        animation-delay: 0s;
      }

      .typing-dot:nth-child(2) {
        animation-delay: 0.2s;
      }

      .typing-dot:nth-child(3) {
        animation-delay: 0.4s;
      }

      @keyframes loadingFade {
        0% {
          opacity: 0;
        }
        50% {
          opacity: 0.8;
        }
        100% {
          opacity: 0;
        }
      }
    `,
  ],
  templateUrl: './chat.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ChatManager],
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChildren('messageDiv') private messages!: QueryList<ElementRef>;
  @ViewChildren('propositionDiv') private proposition!: QueryList<ElementRef>;

  public manager = inject(ChatManager);
  public inputValue: string;
  protected readonly OpenAiRole = OpenAiRole;
  started: boolean;

  ngOnInit(): void {
    console.log('ChatComponent');
    // this.manager.movieProposition.next({
    //   adult: false,
    //   backdrop_path: '/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg',
    //   id: 278,
    //   original_language: 'en',
    //   genre_ids: [],
    //   original_title: 'The Shawshank Redemption',
    //   overview:
    //     "En 1947, Andy Dufresne, un jeune banquier, est condamné à la prison à vie pour le meurtre de sa femme et de son amant. Ayant beau clamer son innocence, il est emprisonné à Shawshank, le pénitencier le plus sévère de l'État du Maine. Il y fait la rencontre de Red, un noir désabusé, détenu depuis vingt ans. Commence alors une grande histoire d'amitié entre les deux hommes…",
    //   popularity: 162.204,
    //   poster_path: '/t30GjttOdb5At1sYy8b3TOwFgWV.jpg',
    //   release_date: '1994-09-23',
    //   title: 'Les Évadés',
    //   video: false,
    //   vote_average: 8.705,
    //   vote_count: 26178,
    // });

    // this.manager.seriesProposition.next({
    //   origin_country: [],
    //   adult: false,
    //   backdrop_path: '/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg',
    //   id: 278,
    //   original_language: 'en',
    //   genre_ids: [],
    //   original_name: 'The Shawshank Redemption',
    //   overview:
    //     "En 1947, Andy Dufresne, un jeune banquier, est condamné à la prison à vie pour le meurtre de sa femme et de son amant. Ayant beau clamer son innocence, il est emprisonné à Shawshank, le pénitencier le plus sévère de l'État du Maine. Il y fait la rencontre de Red, un noir désabusé, détenu depuis vingt ans. Commence alors une grande histoire d'amitié entre les deux hommes…",
    //   popularity: 162.204,
    //   poster_path: '/t30GjttOdb5At1sYy8b3TOwFgWV.jpg',
    //   first_air_date: '1994-09-23',
    //   name: 'Les Évadés',
    //   vote_average: 8.705,
    //   vote_count: 26178,
    // });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    const lastMessage = this.messages.last;
    const proposition = this.proposition.last;

    if (lastMessage) {
      lastMessage.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }

    if (proposition) {
      proposition.nativeElement.scrollIntoView({ behavior: 'smooth' });
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

  startConversation(): void {
    this.manager.addMessage({
      content: 'Aide-moi',
      role: OpenAiRole.User,
    });
    this.started = true;
  }

  sendUserInterest(isInterest: boolean): void {
    if (!isInterest) {
      // Cache le message de proposition
      this.manager.movieProposition.next(null);
      this.manager.seriesProposition.next(null);

      this.manager.addMessage({
        content: `Je ne suis pas intéressé par celui la, peux tu m'en proposer un autre ?`,
        role: OpenAiRole.User,
      });
    }
  }
}
