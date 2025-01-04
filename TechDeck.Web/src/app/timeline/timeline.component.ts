import { Component } from '@angular/core';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {
  public posts: Post[] = [];

  constructor(private readonly postService: PostService) {
    this.postService.getActivity().subscribe(posts => this.posts = posts);
  }
}