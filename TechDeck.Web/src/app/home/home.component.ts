import { Component, Signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SecurityService } from '../security/security.service';
import { UserAuthBase } from '../security/user-auth-base';
import { PostService } from '../services/post.service';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private securityService: SecurityService,
    private postService: PostService,
    private messageService: MessageService) {
      
    this.isLoggedIn = securityService.isLoggedIn;
    this.user = securityService.user;
  }

  public isLoggedIn: Signal<boolean>;
  public user: Signal<UserAuthBase | null>;
  public showForm: boolean = false;

  public newPostForm = new FormGroup({
    text: new FormControl('', [Validators.required, Validators.maxLength(500)]),
  })
  get text() {
    return this.newPostForm.controls.text;
  }
  public showNewPostForm(): void {
    this.showForm = true;
  }

  onSubmit() {
    this.postService.createPost(this.text.value!).subscribe(() =>
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Post created successfully!' }));
  }
}
