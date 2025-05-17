import { Component, EventEmitter, Output, Signal } from '@angular/core';
import { Conversation } from '../models/conversation';
import { Message } from '../models/message';
import { PaginatedList } from '../models/paginated-list';
import { SecurityService } from '../security/security.service';
import { UserAuthBase } from '../security/user-auth-base';
import { MessageService } from '../services/message.service';
import { SignalRService } from '../services/signal-r.service';

@Component({
  selector: 'conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrl: './conversation-list.component.scss'
})
export class ConversationListComponent {
  @Output() public conversationSelectedEvent = new EventEmitter<number>();

  public selectedConversationUserId: number = 0;
  public conversations: Conversation[] = [];
  public currentPage: PaginatedList<Conversation> = PaginatedList.default();

  public showSearchBar: boolean = false;
  public user: Signal<UserAuthBase | null>;

  constructor(
    private readonly signalRService: SignalRService,
    private readonly messageService: MessageService,
    securityService: SecurityService) 
  {
    securityService.tryReloadSession();
    this.user = securityService.user;
  }

  ngOnInit(): void {
    this.firstConversationPage();
    this.addMessageListener();
  }

  ngOnDestroy(): void {
    this.signalRService.getHubConnection().off('ReceiveMessage');
  }

  private addMessageListener(): void {
    this.signalRService.getHubConnection()
      .on('ReceiveMessage', (message: Message) => {
        if (message.senderId == this.user()!.userId) {
          return;
        }
        
        const conversationIndex = this.conversations.findIndex(c => c.personId === message.senderId);

        if (conversationIndex != -1) {
          this.conversations.splice(conversationIndex, 1);
        }
        
        this.messageService.getConversation(message.senderId).subscribe(conversation => {
          this.conversations.unshift(conversation);
        });
      });
  }
  

  public firstConversationPage() {
    this.messageService.getConversationsPaged(1, 10)
      .subscribe(page => {
        this.currentPage = page;
        this.conversations = this.currentPage.items
      }
    );
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
