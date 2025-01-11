import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { PaginatedList } from '../models/paginated-list';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private readonly http: HttpClient) { }

  public createPost(text: string): Observable<void> {
    return this.http.post<void>('https://localhost:7101/post/create-post', {text});
  }

  public getActivityPaged(pageNumber: number, pageSize: number): Observable<PaginatedList<Post>> {
    return this.http.post<PaginatedList<Post>>('https://localhost:7101/post/activity', {pageNumber, pageSize})
  }

  public getPost(postId: number): Observable<Post> {
    return this.http.get<Post>('https://localhost:7101/post/post/' + postId);
  }
}
