import { Component } from '@angular/core';
import { SignalRService } from '../services/signal-r.service';

@Component({
  selector: 'messages-area',
  templateUrl: './messages-area.component.html',
  styleUrl: './messages-area.component.scss'
})
export class MessagesAreaComponent {
  public showConversation: boolean = false;
  public selectedConversationPersonId: number = 0;

  constructor(private readonly signalRService: SignalRService) { }

  ngOnInit(): void {
    this.signalRService.connect();
  }

  ngOnDestroy(): void {
    this.signalRService.getHubConnection().stop();
  }

  public openChat(personId: number): void {
    this.selectedConversationPersonId = personId;
    this.showConversation = true;
  }

  public closeChat(): void {
    this.showConversation = false;
  }
}
