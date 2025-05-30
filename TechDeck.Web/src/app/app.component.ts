import { Component, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { SecurityService } from './security/security.service';
import { UserAuthBase } from './security/user-auth-base';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title = 'tech-deck';

  public items: MenuItem[] = [
    { label: 'Log in', icon: 'pi pi-sign-in', route: 'log-in', style: {'margin-left': 'auto'}, isLoggedIn: false },
    { label: 'Sign up', icon: 'pi pi-user-plus', route: 'sign-up', isLoggedIn: false }
  ];

  public accountItems: MenuItem[] = [
    { label: 'My Profile', icon: 'pi pi-user', command: () => this.router.navigateByUrl('/my-profile') },
    {
      label: 'Messages',
      icon: 'pi pi-comment',
      command: () => this.showMessagesArea = !this.showMessagesArea, 
      escape: false
    },
    { label: 'Log out', icon: 'pi pi-sign-out', command: () => this.logOut() }
  ];
  
  public isLoggedIn: Signal<boolean>;
  public user: Signal<UserAuthBase | null>;
  public showMessagesArea = false;

  constructor(
    private readonly securityService: SecurityService,
    private readonly messageService: MessageService,
    private readonly router: Router) { 
    securityService.tryReloadSession();

    this.isLoggedIn = securityService.isLoggedIn;
    this.user = securityService.user;
  }

  ngOnInit(): void {
    this.messageService.getUnreadMessagesCount().subscribe(count => {
      if (count != 0)
        this.accountItems[1].label = `Messages <span class="unread-messages-counter"> ${count} </span>`;
    });
  }


  public logOut(): void {
    this.securityService.logOut();
  }
}
