import { Component, OnInit, Signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SecurityService } from '../security/security.service';
import { UserAuthBase } from '../security/user-auth-base';
import { PostService } from '../services/post.service';

import { MessageService } from 'primeng/api';
import { TimelineComponent } from '../timeline/timeline.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  @ViewChild(TimelineComponent) timeline!: TimelineComponent;
  public isLoggedIn: Signal<boolean>;
  public user: Signal<UserAuthBase | null>;
  public showForm: boolean = false;
  public files?: FileList;

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
    if(!this.showForm) {
      this.text.markAsUntouched;
    }
    
    this.showForm = !this.showForm;
  }

  get text() {
    return this.newPostForm.controls.text;
  }
  
  public fileToUpload: File | null | undefined;

  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.files = target.files as FileList;
    
    if(this.files.length > 3) {
      this.messageService.add({
        severity: 'error',
        summary: 'Failed',
        detail: 'You may only attach up to 3 images to your post.' });
    }
    else {
      const invalidFileExtension = Array.from(this.files)
        .some(file => !(file.name.endsWith('.png') || file.name.endsWith('.jpg') || file.name.endsWith('.jpeg')))
        
      if(invalidFileExtension) {
        this.messageService.add({
          key: 'cornerToasts',
          severity: 'error',
          summary: 'Failed',
          detail: 'You may only attach images of PNG or JPEG format.' });
      }
      else {
        this.messageService.add({
          key: 'cornerToasts',
          severity: 'success',
          summary: 'Success',
          detail: 'Your images were attached successfully!' });
      }
    }
  }

  onSubmit() {
    this.postService.createPost(this.text.value!, this.files).subscribe(() => {
      this.messageService.add({
        key: 'cornerToasts',
        severity: 'success',
        summary: 'Success',
        detail: 'Post created successfully!' });
      this.timeline.refreshActivity();
    });
  }
}
