import { Component, Signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SecurityService } from '../security/security.service';
import { UserAuthBase } from '../security/user-auth-base';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  public isLoggedIn: Signal<boolean>;
  public user: Signal<UserAuthBase | null>;
  public file?: File;
  public profilePictureStyle: any;
  public bannerStyle: any;
  public nameInput: string = '';

  constructor(
    private readonly securityService: SecurityService,
    private readonly accountService: AccountService,
    private readonly messageService: MessageService,)
  {
    this.isLoggedIn = this.securityService.isLoggedIn;
    this.user = this.securityService.user;
    accountService.getName(this.user()!.userId).subscribe(name => {
      this.nameInput = name;
    });
  }

  public bannerInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.accountService.uploadBanner(target.files![0]).subscribe(() => {
      const timestamp = new Date().getTime();
      const imageUrl = `https://localhost:7101/account/banner/${this.user()!.userId}?t=${timestamp}`;
      this.checkBanner(imageUrl);
    });
  }

  public profilePictureInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.accountService.uploadProfilePicture(target.files![0]).subscribe(() => {
      const timestamp = new Date().getTime();
      const imageUrl = `https://localhost:7101/account/profile-picture/${this.user()!.userId}?t=${timestamp}`;
      this.checkProfilePicture(imageUrl);
    });
  }
  
  private checkBanner(url: string): void {
    const img = new Image();
    img.onload = () => {
      this.bannerStyle = `url(${url})`;
    };
    img.onerror = () => {
      this.bannerStyle = "linear-gradient(to right bottom, #be1ae1, #8a62ff, #4a85ff, #009eff)";
    };
    img.src = url;
  }

  private checkProfilePicture(url: string): void {
    const img = new Image();
    img.onload = () => {
      this.profilePictureStyle = `url(${url})`;
    };
    img.onerror = () => {
      this.profilePictureStyle = "url(../../assets/profile-picture-placeholder.jpg)";
    };
    img.src = url;
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
    const timestamp = new Date().getTime();
    const profilePictureUrl = `https://localhost:7101/account/profile-picture/${this.user()!.userId}?t=${timestamp}`;
    this.checkProfilePicture(profilePictureUrl);
    const bannerUrl = `https://localhost:7101/account/banner/${this.user()!.userId}?t=${timestamp}`;
    this.checkBanner(bannerUrl);
  }
}