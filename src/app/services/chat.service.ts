import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class ChatService {
  constructor(private httpClient: HttpClient) {
  }

  getMessages(): Observable<any[]> {
    return this.httpClient.get<any[]>('https://messages.free.beeceptor.com/messages');
  }

  fromChatbot(message): Observable<any[]> {
    return this.httpClient.get<any>('http://127.0.0.1:5006/api/chatbot/' + message);
  }

}
