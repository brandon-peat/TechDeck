import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { SecurityService } from '../security/security.service';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: HubConnection;

  constructor(private readonly securityService: SecurityService) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7101/messagingHub', {
        accessTokenFactory: () => {
          const user = this.securityService.user();
          return user?.bearerToken || '';
        }
      })
      .build();
  }

  getHubConnection(): HubConnection {
    return this.hubConnection;
  }

  async connect(): Promise<void> {
      await this.hubConnection.start();
  }

  public sendMessage(text: string, recipientId: number ): Promise<void> {
    return this.hubConnection.invoke('SendMessage', text, recipientId);
  }
}