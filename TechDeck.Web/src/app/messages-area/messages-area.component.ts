import { Component, Signal } from '@angular/core';
import { Conversation } from '../models/conversation';
import { PaginatedList } from '../models/paginated-list';
import { SecurityService } from '../security/security.service';
import { UserAuthBase } from '../security/user-auth-base';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'messages-area',
  templateUrl: './messages-area.component.html',
  styleUrl: './messages-area.component.scss'
})
export class MessagesAreaComponent {
  public selectedConversationUserId: number = 0;
  public conversations: Conversation[] = [];
  public currentPage: PaginatedList<Conversation> = PaginatedList.default();

  public showSearchBar: boolean = false;
  public showConversation: boolean = false;

  public user: Signal<UserAuthBase | null>;
  
  constructor(
    securityService: SecurityService,
    private readonly messageService: MessageService) 
  {
    securityService.tryReloadSession();
    this.user = securityService.user;
  }

  ngOnInit(): void {
    this.nextConversationPage();
  }

  public openChat(personId: number): void {
    this.selectedConversationUserId = personId;
    this.showConversation = true;
  }

  public closeChat(): void {
    this.showConversation = false;
  }

  public nextConversationPage() {
    this.messageService.getConversationsPaged(this.currentPage.pageNumber + 1, 10)
      .subscribe(page => {
        this.currentPage = page;
        this.conversations.push(...this.currentPage.items)
      }
    );
  }
}
