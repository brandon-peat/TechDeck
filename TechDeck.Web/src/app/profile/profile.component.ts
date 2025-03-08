import { Component, Signal } from '@angular/core';
import { SecurityService } from '../security/security.service';
import { UserAuthBase } from '../security/user-auth-base';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  public isLoggedIn: Signal<boolean>;
  public user: Signal<UserAuthBase | null>;

  constructor(private readonly securityService: SecurityService) {
    this.isLoggedIn = securityService.isLoggedIn;
    this.user = securityService.user;
  }
}
