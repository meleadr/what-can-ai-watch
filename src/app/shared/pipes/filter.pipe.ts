import { Pipe, PipeTransform } from '@angular/core';
import { OpenAiMessage, OpenAiRole } from '@app/feature/chat/model/chat.model';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(
    messages: OpenAiMessage[],
    roleToRemove: OpenAiRole
  ): OpenAiMessage[] {
    return messages.filter(message => message.role !== roleToRemove);
  }
}
