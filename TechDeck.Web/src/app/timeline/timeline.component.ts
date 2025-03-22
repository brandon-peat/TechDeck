import { Component, Input, OnInit } from '@angular/core';
import { PaginatedList } from '../models/paginated-list';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';

const firstPage: number = 1;

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements OnInit {
  @Input({required: true}) isProfile!: boolean;
  public posts: Post[] = [];
  public currentPage: PaginatedList<Post> = {
    items: [],
    pageNumber: 0,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: true
  };

  constructor(private readonly postService: PostService) {}

  ngOnInit(): void {
    this.nextActivityPage();
  }

  public nextActivityPage() {
    const api = this.isProfile 
      ? this.postService.getProfilePostsPaged(this.currentPage.pageNumber + 1, 10)
      : this.postService.getActivityPaged(this.currentPage.pageNumber + 1, 10);

    api.subscribe(page => {
      this.currentPage = page;
      this.posts.push(...this.currentPage.items)
    });
  }

  public refreshActivity() {
    this.posts = [];
    const api = this.isProfile 
      ? this.postService.getProfilePostsPaged(firstPage, this.currentPage.pageNumber * 10)
      : this.postService.getActivityPaged(firstPage, this.currentPage.pageNumber * 10);

    api.subscribe(page => {
      this.currentPage = page;
      this.posts.push(...this.currentPage.items)
    });
  }
}