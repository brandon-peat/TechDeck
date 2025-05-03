import { Component, Input, Signal } from '@angular/core';
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
}
