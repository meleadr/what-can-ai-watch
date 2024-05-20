import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  OpenAiCompletion,
  OpenAiMessage,
  OpenAiMessageContent,
  OpenAiModel,
} from '../model/chat.model';

@Injectable({
  providedIn: 'root',
})
export class OpenAiService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiKey = environment.apiOpenAIKey;

  private http = inject(HttpClient);

  generateResponse(history: OpenAiMessage[]): Observable<OpenAiMessage> {
    const headers = new HttpHeaders({
      ContentType: 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    });

    const body = {
      model: OpenAiModel.GPT4,
      messages: [...history],
      response_format: { type: 'json_object' },
    };

    return this.http
      .post<OpenAiCompletion>(this.apiUrl, body, { headers })
      .pipe(
        map(response => {
          const messageContent: OpenAiMessageContent = JSON.parse(
            response.choices[0].message.content
          );
          return {
            role: response.choices[0].message.role,
            content: messageContent.text,
            title: messageContent.title,
            isMovie: messageContent.isMovie,
          };
        })
      );
  }
}
