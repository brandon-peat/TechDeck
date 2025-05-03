import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private readonly hubConnection: HubConnection;

  constructor() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://')
      .build();
  }
}
