import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

import { jwtDecode } from 'jwt-decode';

interface ReceivedMessage {
  message: string;
  id: number;
  sentAt: number;
  senderId: string;
  senderName: string;
}

interface TokenPayload {
  userId: string;
  email: string;
  name: string;
}
@Injectable({
  providedIn: 'root'
})
export class ChatSocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000'); // Replace with backend URL
  }

  sendMessage(msg: string) {
    const token = localStorage.getItem('token');

    if(!token) {
      return;
    }

    const decoded = jwtDecode<TokenPayload>(token);
    console.log('Decoded token:', decoded);
    
    this.socket.emit('send-message', {message: msg, senderId: decoded.userId});
  }

  receiveMessages(): Observable<ReceivedMessage> {
    return new Observable((observer) => {
      this.socket.on('receive-message', (msg) => {
        observer.next(msg);
      });
    });
  }
}
