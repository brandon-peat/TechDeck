import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedList } from '../models/paginated-list';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private readonly http: HttpClient) { }

  public createPost(text: string): Observable<void> {
    return this.http.post<void>('https://localhost:7101/post/create-post', {text});
  }

  public getActivityPaged(pageNumber: number, pageSize: number): Observable<PaginatedList<Post>> {
    return this.http.post<PaginatedList<Post>>('https://localhost:7101/post/activity', {pageNumber, pageSize});
  }

  public getPost(postId: number): Observable<Post> {
    return this.http.get<Post>('https://localhost:7101/post/post/' + postId);
  }

  public likePost(postId: number): Observable<void> {
    return this.http.post<void>('https://localhost:7101/post/like/' + postId, null);
  }

  public getLikes(postId: number): Observable<number> {
    return this.http.get<number>('https://localhost:7101/post/number-of-likes/' + postId);
  }
  
  public haveILiked(postId: number): Observable<boolean> {
    return this.http.get<boolean>('https://localhost:7101/post/have-i-liked/' + postId)
  }

  public getLikeUsersPaged(pageNumber: number, pageSize: number, postId: number): Observable<PaginatedList<string>> {
    return this.http.post<PaginatedList<string>>('https://localhost:7101/post/get-like-users', {pageNumber, pageSize, postId});
  }
}
