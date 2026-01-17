import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Conversation } from '../models/conversation';
import { Message } from '../models/message';
import { PaginatedList } from '../models/paginated-list';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  public getConversationsPaged(pageNumber: number, pageSize: number): Observable<PaginatedList<Conversation>> {
    return this.http.post<PaginatedList<Conversation>>(`${this.apiUrl}/message/conversations`, { pageNumber, pageSize });
  }

  public getConversation(personId: number): Observable<Conversation> {
    return this.http.get<Conversation>(`${this.apiUrl}/message/conversation/${personId}`);
  }

  public sendMessage(text: string, recipientId: number): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/message/send`, { text, recipientId });
  }

  public getMessagesPaged(pageNumber: number, pageSize: number, personId: number): Observable<PaginatedList<Message>> {
    return this.http.post<PaginatedList<Message>>(`${this.apiUrl}/message/messages`,
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
    return this.http.post<void>(`${this.apiUrl}/message/mark-conversation-as-read`, { personId });
  }

  public getUnreadMessagesCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/message/unread-messages-total`);
  }
}
