import { Component, Input, Signal } from '@angular/core';
import { Router } from '@angular/router';
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
  liked: boolean = false;
  likes: number = 0;

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
    this.liked = !this.liked;
    this.postService.likePost(this.post.id).subscribe();
    if(this.liked) this.likes++;
    else this.likes--;
  }

  ngOnInit(): void {
    this.postService.haveILiked(this.post.id).subscribe(liked => this.liked = liked);
    this.postService.getLikes(this.post.id).subscribe(likes => this.likes = likes);
  }
}