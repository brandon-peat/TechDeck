import { Component, Input } from '@angular/core';
import { Post } from '../models/post';
import { Router } from '@angular/router';

@Component({
  selector: 'post-card',
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent {
  @Input({required: true}) post!: Post;

  constructor(private router: Router) { }

  public viewPost(): void {
    this.router.navigateByUrl('/view-post/' + this.post.id);
  }
}