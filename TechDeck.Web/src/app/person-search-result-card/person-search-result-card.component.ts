import { Component, Input, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { SearchPerson } from '../models/search-person';
import { SecurityService } from '../security/security.service';
import { UserAuthBase } from '../security/user-auth-base';
import { ImageLoaderService } from '../services/image-loader.service';

@Component({
  selector: 'person-search-result-card',
  templateUrl: './person-search-result-card.component.html',
  styleUrl: './person-search-result-card.component.scss'
})
export class PersonSearchResultCardComponent {
  @Input({ required: true }) person!: SearchPerson;
  public user: Signal<UserAuthBase | null>;
  public profilePictureStyle: any;

  constructor(
    private readonly router: Router, 
    securityService: SecurityService,
    private readonly imageLoaderService: ImageLoaderService) 
  {
    securityService.tryReloadSession();
    this.user = securityService.user;
  }

  ngOnChanges(): void {
    this.imageLoaderService.loadProfilePicture(this.person.id)
      .then(style => this.profilePictureStyle = style);
  }

  public navigateToProfile(event: Event): void {
    event.stopPropagation();
    this.router.navigateByUrl(this.person.id == this.user()!.userId ? 'my-profile' : 'profile/' + this.person.id);
  }
}
