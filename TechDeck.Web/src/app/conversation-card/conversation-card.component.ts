import { Component, EventEmitter, Input, Output, Signal } from '@angular/core';
import { Conversation } from '../models/conversation';
import { SecurityService } from '../security/security.service';
import { UserAuthBase } from '../security/user-auth-base';
import { ImageLoaderService } from '../services/image-loader.service';

@Component({
  selector: 'conversation-card',
  templateUrl: './conversation-card.component.html',
  styleUrl: './conversation-card.component.scss'
})
export class ConversationCardComponent {
  @Input({ required: true }) conversation!: Conversation;
  @Output() openChatEvent = new EventEmitter<number>();
  
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
    this.imageLoaderService.loadProfilePicture(this.conversation.personId)
      .then(style => {
        this.profilePictureStyle = style;
    });
  }
}
