import { Component, Input, Signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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
  showReplyForm: boolean = false;
  liked: boolean = false;
  likeCount: number = 0;
  replyCount: number = 0;
  icon: any;

  public replyForm = new FormGroup({
      text: new FormControl('', [Validators.required, Validators.maxLength(280)]),
  })

  constructor(
    private router: Router,
    private readonly securityService: SecurityService,
    private readonly messageService: MessageService,
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
      if(this.liked) this.likeCount++;
      else this.likeCount--;
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

  public toggleReplyForm(event: Event | null = null): void {
    event?.stopPropagation();
    this.showReplyForm = !this.showReplyForm;
    this.replyForm.reset();
  }
  public onSubmit(): void {
    this.postService.createReply(this.post.id!, this.replyForm.controls.text.value!).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Post created successfully!' });
      this.post.replies.push({
        id: 0,
        personId: 0,
        postId: 0,
        dateCreated: new Date(),
        text: this.replyForm.controls.text.value!,
        authorName: this.user()!.name
      });
      this.replyCount++;
      this.toggleReplyForm();
    });
  }

  ngOnChanges(): void {
    if(this.post.id != -1) {
      this.postService.haveILiked(this.post.id).subscribe(liked => this.liked = liked);
      this.postService.getLikes(this.post.id).subscribe(likes => this.likeCount = likes);
      this.postService.getReplies(this.post.id).subscribe(replies => this.replyCount = replies);
      this.post.replies = [];
    }
  }
}