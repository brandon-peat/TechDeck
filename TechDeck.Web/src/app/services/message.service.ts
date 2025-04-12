import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conversation } from '../models/conversation';
import { PaginatedList } from '../models/paginated-list';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private readonly http: HttpClient) { }

  public getConversationsPaged(pageNumber: number, pageSize: number): Observable<PaginatedList<Conversation>> {
    return this.http.post<PaginatedList<Conversation>>('https://localhost:7101/message/conversations', { pageNumber, pageSize });
  }
}
