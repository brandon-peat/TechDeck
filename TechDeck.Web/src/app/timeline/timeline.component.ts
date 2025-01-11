import { Component } from '@angular/core';
import { PaginatedList } from '../models/paginated-list';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {
  public posts: Post[] = [];
  public currentPage: PaginatedList<Post> = {
    items: [],
    pageNumber: 0,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: true
  };

  constructor(private readonly postService: PostService) {
    this.nextActivityPage();
  }

  public nextActivityPage() {
    this.postService.getActivityPaged(this.currentPage.pageNumber + 1, 10).subscribe(page => {
        this.currentPage = page;
        this.posts.push(...this.currentPage.items);
    });
  }
}