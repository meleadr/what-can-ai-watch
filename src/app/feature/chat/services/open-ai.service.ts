import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  OpenAiCompletion,
  OpenAiMessage,
  OpenAiModel,
} from '../model/chat.model';

@Injectable({
  providedIn: 'root',
})
export class OpenAiService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiKey = environment.apiOpenAIKey;

  constructor(private http: HttpClient) {}

  generateResponse(history: OpenAiMessage[]): Observable<OpenAiCompletion> {
    const headers = new HttpHeaders({
      ContentType: 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    });

    const body = {
      model: OpenAiModel.GPT3,
      messages: [...history],
    };

    return this.http.post<OpenAiCompletion>(this.apiUrl, body, { headers });
  }
}
