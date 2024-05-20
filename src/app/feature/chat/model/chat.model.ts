export interface OpenAiCompletion {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: OpenAiChoice[];
  usage: OpenAIUsage;
}

export interface OpenAiChoice {
  index: number;
  message: OpenAiMessageResponse;
  logprobs: string;
  finish_reason: string;
}

export interface OpenAiMessage {
  role: string;
  content: string;
  title?: string;
}

export interface OpenAiMessageResponse {
  role: string;
  content: string;
}

export interface OpenAiMessageContent {
  title: string;
  text: string;
}

export enum OpenAiRole {
  User = 'user',
  Assistant = 'assistant',
  System = 'system',
}

export interface OpenAIUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export enum OpenAiModel {
  GPT3 = 'gpt-3.5-turbo',
  GPT4 = 'gpt-4o',
}
