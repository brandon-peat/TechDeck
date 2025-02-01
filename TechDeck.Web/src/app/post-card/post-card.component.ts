import { Component, Input, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatedList } from '../models/paginated-list';
import { Post } from '../models/post';
import { SecurityService } from '../security/security.service';
import { UserAuthBase } from '../security/user-auth-base';
import { PostService } from '../services/post.service';

@Component({
  selector: 'post-card',
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent {
  @Input({required: true}) post!: Post;
  public user: Signal<UserAuthBase | null>;
  public likeUsers: string[] = [];
  currentPage: PaginatedList<string> = {
      items: [],
      pageNumber: 0,
      totalPages: 0,
      hasPreviousPage: false,
      hasNextPage: true
    };
  showUsers: boolean = false;
  liked: boolean = false;
  likes: number = 0;
icon: any;

  constructor(
    private router: Router,
    private readonly securityService: SecurityService,
    private readonly postService: PostService
  ) { 
    securityService.tryReloadSession();
    this.user = securityService.user;
  }

  public viewPost(): void {
    this.router.navigateByUrl('/view-post/' + this.post.id);
  }
  public likePost(event: Event): void {
    event.stopPropagation();
    if(this.post.authorName != this.user()!.name) {
      this.liked = !this.liked;
      this.postService.likePost(this.post.id).subscribe();
      if(this.liked) this.likes++;
      else this.likes--;
    }
  }
  public showUsersLiked(event: Event): void {
    event.stopPropagation();
    this.showUsers = !this.showUsers;
    
    if(this.currentPage.pageNumber == 0) {
      this.getNextPage();
    }
  }

  public likeUsersNextPage(event: Event): void {
    event.stopPropagation();
    this.getNextPage();
  }
  public getNextPage(): void {
    this.postService.getLikeUsersPaged(this.currentPage.pageNumber + 1, 5, this.post.id).subscribe(page => {
      this.currentPage = page;
      if(this.currentPage.items[0] == undefined) {
        this.likeUsers.push("No users have liked this post yet.");
      } 
      else this.likeUsers.push(...this.currentPage.items);
    });
  }

  ngOnChanges(): void {
    if(this.post.id != 0) {
      this.postService.haveILiked(this.post.id).subscribe(liked => this.liked = liked);
      this.postService.getLikes(this.post.id).subscribe(likes => this.likes = likes);
    }
  }
}