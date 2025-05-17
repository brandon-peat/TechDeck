import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Conversation } from '../models/conversation';
import { Message } from '../models/message';
import { PaginatedList } from '../models/paginated-list';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private readonly http: HttpClient) { }

  public getConversationsPaged(pageNumber: number, pageSize: number): Observable<PaginatedList<Conversation>> {
    return this.http.post<PaginatedList<Conversation>>('https://localhost:7101/message/conversations', { pageNumber, pageSize });
  }

  public getConversation(personId: number): Observable<Conversation> {
    return this.http.get<Conversation>(`https://localhost:7101/message/conversation/${personId}`);
  }

  public sendMessage(text: string, recipientId: number): Observable<number> {
    return this.http.post<number>('https://localhost:7101/message/send', { text, recipientId });
  }

  public getMessagesPaged(pageNumber: number, pageSize: number, personId: number): Observable<PaginatedList<Message>> {
    return this.http.post<PaginatedList<Message>>('https://localhost:7101/message/messages',
      { pageNumber, pageSize, personId }).pipe(
        map(response => {
          response.items.forEach(message => {
            message.dateTimeSent = new Date(message.dateTimeSent);
          });
          return response;
        })
      );
  }

  public markConversationAsRead(personId: number): Observable<void> {
    return this.http.post<void>('https://localhost:7101/message/mark-conversation-as-read', { personId });
  }

  public getUnreadMessagesCount(): Observable<number> {
    return this.http.get<number>('https://localhost:7101/message/unread-messages-total');
  }
}
