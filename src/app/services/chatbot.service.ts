import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { AppConfig } from '../app-config';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  chatbotData$: Observable<any>;
  private chatbotDataSubject = new Subject<any>();

  constructor(private http: HttpClient) {
    this.chatbotData$ = this.chatbotDataSubject.asObservable();
  }

  send_message(message: string) {
    return this.http.get('http://127.0.0.1:5006/api/chatbot/' + message)
  }

  send_data_to_map_component(data) {
    this.chatbotDataSubject.next(data);
  }
}

