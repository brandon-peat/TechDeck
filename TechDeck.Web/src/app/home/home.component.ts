import { Component, Signal, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SecurityService } from '../security/security.service';
import { UserAuthBase } from '../security/user-auth-base';
import { PostService } from '../services/post.service';

import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public isLoggedIn: Signal<boolean>;
  public user: Signal<UserAuthBase | null>;
  public showForm: boolean = false;

  constructor(
    private router: Router,
    private securityService: SecurityService,
    private postService: PostService,
    private messageService: MessageService) {
      
    this.isLoggedIn = securityService.isLoggedIn;
    this.user = securityService.user;
  }

  public ngOnInit(): void {
    if (!this.securityService.isLoggedIn()) {
      this.router.navigateByUrl('/log-in')
    }
  }

  public newPostForm = new FormGroup({
    text: new FormControl('', [Validators.required, Validators.maxLength(500)]),
  })
  
  public showNewPostForm(): void {
    if(this.showForm == true) this.showForm = false;
    else {
      this.showForm = true;
      this.text.markAsUntouched();
    }
  }

  get text() {
    return this.newPostForm.controls.text;
  }
  
  onSubmit() {
    this.postService.createPost(this.text.value!).subscribe(() =>
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Post created successfully!' }));
  }
}
