import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginatedList } from '../models/paginated-list';
import { Post } from '../models/post';
import { Reply } from '../models/reply';
import { PostService } from '../services/post.service';

const pageSize: number = 10;

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
  public currentPage: PaginatedList<Reply> = {
    items: [],
    pageNumber: 0,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: true
  };

  constructor(private readonly postService: PostService) {}

  public repliesNextPage() {
    this.postService.getRepliesPaged(this.postId!, this.currentPage.pageNumber + 1, pageSize).subscribe(page => {
      this.currentPage = page;
      this.post.replies.push(...this.currentPage.items);
    });
  }

  ngOnInit(): void {
    this.postId = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.getPost(this.postId).subscribe(post => {
      this.post = post;
      this.repliesNextPage();
    });
  }
}