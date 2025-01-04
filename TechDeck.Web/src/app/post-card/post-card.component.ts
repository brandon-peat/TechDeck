import { Component, Input } from '@angular/core';
import { Post } from '../models/post';

@Component({
  selector: 'post-card',
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent {
  @Input({required: true}) post!: Post;
}