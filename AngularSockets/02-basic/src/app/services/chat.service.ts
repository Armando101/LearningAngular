import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private wsService: WebsocketService
  ) { }

  sendMessage(message: string): void {
    const payload = {
      from: 'Armando',
      body: message
    };
    this.wsService.emit('message', payload);
  }
}
