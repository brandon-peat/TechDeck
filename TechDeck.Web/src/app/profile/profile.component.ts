import { Component, inject, Signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SecurityService } from '../security/security.service';
import { UserAuthBase } from '../security/user-auth-base';
import { AccountService } from '../services/account.service';
import { ImageLoaderService } from '../services/image-loader.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  public readonly route = inject(ActivatedRoute);
  public isLoggedIn: Signal<boolean>;
  public user: Signal<UserAuthBase | null>;
  public file?: File;
  public profilePictureStyle: any;
  public bannerStyle: any;
  public nameInput: string = '';
  public isMyProfile: boolean = false;
  public personId: number;

  constructor(
    private readonly securityService: SecurityService,
    private readonly accountService: AccountService,
    private readonly messageService: MessageService,
    private readonly imageLoaderService: ImageLoaderService,
    private readonly titleService: Title)
  {
    this.isLoggedIn = this.securityService.isLoggedIn;
    this.user = this.securityService.user;

    this.personId = Number(this.route.snapshot.paramMap.get('id') ?? this.user()!.userId);
    accountService.getName(this.personId).subscribe(name => {
      this.nameInput = name;
    });

    this.isMyProfile = (this.route.snapshot.paramMap.get('id') == null);
  }

  public bannerInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.accountService.uploadBanner(target.files![0]).subscribe(() => {
      const imageUrl = this.imageLoaderService.getTimestampedUrl(`https://localhost:7101/account/banner/${this.user()!.userId}`);
      this.imageLoaderService.loadImageWithFallback(imageUrl, "linear-gradient(to right bottom, #be1ae1, #8a62ff, #4a85ff, #009eff)")
        .then(style => this.bannerStyle = style);
    });
  }

  public profilePictureInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.accountService.uploadProfilePicture(target.files![0]).subscribe(() => {
      const imageUrl = this.imageLoaderService.getTimestampedUrl(`https://localhost:7101/account/profile-picture/${this.user()!.userId}`);
      this.imageLoaderService.loadProfilePicture(this.user()!.userId)
        .then(style => this.profilePictureStyle = style);
    });
  }

  public onNameBlur(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let newName = inputElement.value.trim();

    if (newName === this.user()!.name) return;

    if (!newName.includes(" ")) {
      this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Please enter both your first and last name.' });
      inputElement.value = this.user()!.name;
      return;
    }

    let firstName = newName.split(" ")[0];
    let lastName = newName.split(" ")[1];

    if(firstName.length > 25) {
      this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Your first name must be less than 25 characters.' });
    }
    else if(lastName.length > 25) {
      this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Your last name must be less than 25 characters.' });
    }
    else {
      this.accountService.updateName(firstName, lastName).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Your name was updated successfully.' });
        this.securityService.updateName(newName);
      });
    }
  }

  public ngOnInit(): void {
    if(!this.isMyProfile) {
      this.accountService.getName(this.personId).subscribe(name => {
        this.titleService.setTitle(`${name}'s Profile - Tech Deck`);
      });
    }

    this.imageLoaderService.loadProfilePicture(this.personId)
      .then(style => this.profilePictureStyle = style);
    this.imageLoaderService.loadBanner(this.personId)
      .then(style => this.bannerStyle = style);
  }
}