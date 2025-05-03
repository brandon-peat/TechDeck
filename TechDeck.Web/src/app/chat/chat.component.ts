import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, ElementRef, EventEmitter, Input, Output, signal, Signal, ViewChild, WritableSignal } from '@angular/core';
import { Message } from '../models/message';
import { PaginatedList } from '../models/paginated-list';
import { SecurityService } from '../security/security.service';
import { UserAuthBase } from '../security/user-auth-base';
import { AccountService } from '../services/account.service';
import { ImageLoaderService } from '../services/image-loader.service';
import { MessageService } from '../services/message.service';
import { GroupedMessages, MessageGroup } from './grouped-messages';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent {
  @ViewChild('scroll') private scrollContainer!: ElementRef;
  @Input() public personId!: number;
  public personName: WritableSignal<string> = signal('');
  public profilePictureStyle: WritableSignal<any> = signal({});

  @Output() backButtonClickedEvent = new EventEmitter<void>;

  public user: Signal<UserAuthBase | null>;

  private readonly firstPage = 1;
  private readonly pageSize = 40;
  private messages: WritableSignal<Message[]> = signal([]);
  public messagesReversedGrouped: Signal<MessageGroup[]> = computed(() => 
    GroupedMessages.groupMessages(this.messages()
    .sort((a, b) => a.dateTimeSent.getTime() - b.dateTimeSent.getTime()))
  );
  public firstUnreadMessageId: Signal<number | undefined> = computed(() => 
    this.messages().find(message =>
      !message.isRead &&
      message.senderId != this.user()!.userId
    )?.id
  );

  public currentPage: PaginatedList<Message> = PaginatedList.default();

  private observer!: MutationObserver;

  constructor(
    private readonly messageService: MessageService,
    private readonly accountService: AccountService,
    private readonly imageLoaderService: ImageLoaderService,
    private readonly cdr: ChangeDetectorRef,
    securityService: SecurityService)
  {
    this.user = securityService.user;
  }

  ngOnInit(): void {
    this.messageService.getMessagesPaged(this.firstPage, this.pageSize, this.personId).subscribe(page => {
      this.messages.set(page.items);
      this.currentPage = page;
    });

    this.messageService.markConversationAsRead(this.personId).subscribe();

    this.accountService.getName(this.personId).subscribe(name => {
      this.personName.set(name);
    });

    this.imageLoaderService.loadProfilePicture(this.personId)
      .then(style => this.profilePictureStyle.set(style));
  }

  ngAfterViewInit(): void {
    this.observer = new MutationObserver(() => {
      if (this.messages().length <= this.pageSize) {
        this.scrollToBottom('auto');
      }
    });
  
    this.observer.observe(this.scrollContainer.nativeElement, {
      childList: true,
      subtree: true,
    });
  
    this.scrollContainer.nativeElement.addEventListener('scroll', () => {
      this.onScroll();
    });
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private onScroll(): void {
    const container = this.scrollContainer.nativeElement;
  
    if (container.scrollTop === 0) {
      const previousScrollHeight = container.scrollHeight;
  
      this.messageService.getMessagesPaged(this.currentPage.pageNumber + 1, this.pageSize, this.personId).subscribe(page => {
        this.currentPage = page;
        this.messages.set([
          ...page.items,
          ...this.messages()
        ]);
        
        this.cdr.detectChanges();

        setTimeout(() => {
          const newScrollHeight = container.scrollHeight;
          container.scrollTop = newScrollHeight - previousScrollHeight;
        });
      });
    }
  }

  public scrollToBottom(behaviour: string): void {
    const container = this.scrollContainer.nativeElement;
    container.scrollTo({ top: container.scrollHeight, behavior: behaviour });
  }

  public sendMessage(event: Event): void {
    event.preventDefault();

    const textarea = event.target as HTMLTextAreaElement;
    const message = textarea.value.trim();

    if (message.length > 1000 || !message) {
      return;
    }

    this.messageService.sendMessage(message, this.personId).subscribe(id => {
      this.messages.set([
        {
        id: id,
        senderId: this.user()!.userId,
        recipientId: this.personId,
        dateTimeSent: new Date(Date.now()),
        text: message,
        isRead: false
        },
        ...this.messages()
      ]);

      setTimeout(() => this.scrollToBottom('smooth'));
    });
    textarea.value = '';
    textarea.style.height = 'auto';
  }
}
