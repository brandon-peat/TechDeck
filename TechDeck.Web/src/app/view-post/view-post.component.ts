import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';

@Component({
  selector: 'view-post',
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.scss'
})
export class ViewPostComponent {
  private readonly route = inject(ActivatedRoute);
  public postId: number | null = 0;
  public post: Post = {
    id: -1,
    personId: 0,
    dateCreated: new Date(),
    text: "",
    authorName: "",
    replies: []
  };

  constructor(private readonly postService: PostService) {}

  ngOnInit(): void {
    this.postId = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.getPost(this.postId).subscribe(post => this.post = post);
  }
}