import { Client } from './client.model';

export interface ApiResponse {
  message: string;
  response: Client[];
  error: boolean;
}