import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedList } from '../models/paginated-list';
import { Post } from '../models/post';
import { Reply } from '../models/reply';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private readonly http: HttpClient) { }

  public createPost(text: string, files?: FileList): Observable<void> {
    let fd = new FormData()
    fd.append('text', text);
    if(files != undefined) {
      for(var file in Array.from(files)) {
        fd.append('files', files.item(Number(file))!);
      }
    }
    return this.http.post<void>('https://localhost:7101/post/create-post', fd);
  }

  public getActivityPaged(pageNumber: number, pageSize: number): Observable<PaginatedList<Post>> {
    return this.http.post<PaginatedList<Post>>('https://localhost:7101/post/activity', {pageNumber, pageSize});
  }

  public getProfilePostsPaged(pageNumber: number, pageSize: number): Observable<PaginatedList<Post>> {
    return this.http.post<PaginatedList<Post>>('https://localhost:7101/post/my-posts', {pageNumber, pageSize});
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

  public createReply(postId: number, text: string): Observable<void> {
    return this.http.post<void>('https://localhost:7101/post/reply', {postId, text});
  }

  public getRepliesPaged(postId: number, pageNumber: number, pageSize: number): Observable<PaginatedList<Reply>> {
    return this.http.post<PaginatedList<Reply>>('https://localhost:7101/post/replies/query', {postId, pageNumber, pageSize});
  }

  public getReplies(postId: number): Observable<number> {
    return this.http.get<number>('https://localhost:7101/post/number-of-replies/' + postId);
  }
}
