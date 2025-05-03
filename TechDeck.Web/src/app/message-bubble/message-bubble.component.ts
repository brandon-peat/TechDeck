import { Component, Input, Signal } from '@angular/core';
import { Message } from '../models/message';
import { SecurityService } from '../security/security.service';
import { UserAuthBase } from '../security/user-auth-base';

@Component({
  selector: 'message-bubble',
  templateUrl: './message-bubble.component.html',
  styleUrl: './message-bubble.component.scss'
})
export class MessageBubbleComponent {
  @Input({ required: true}) public message!: Message;
  @Input() public isFirstInGroup: boolean | undefined = true;
  @Input() public isLastInGroup: boolean | undefined = true;

  public user: Signal<UserAuthBase | null>;

  constructor(securityService: SecurityService) {
    this.user = securityService.user;
  }
}
