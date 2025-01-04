import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private readonly http: HttpClient) { }

  public createPost(text: string): Observable<void> {
    return this.http.post<void>('https://localhost:7101/post/create-post', {text});
  }

  public getActivity(): Observable<Post[]> {
    return this.http.get<Post[]>('https://localhost:7101/post/activity');
  }
}
