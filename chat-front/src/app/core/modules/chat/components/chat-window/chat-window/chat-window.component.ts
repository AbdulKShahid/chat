import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import { ChatMessage } from '../../../models/chat.model';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgClass } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatSocketService } from '../../../../../services/chat-socket.service';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [MatInputModule, FormsModule, DatePipe, NgClass],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent implements OnInit{
  messages: ChatMessage[] | undefined = undefined;
  newMessage: string = '';
  userName: string | null = localStorage.getItem('userName');
  userId: string | null = localStorage.getItem('userId');

  constructor(private chatService: ChatService,
    private route: ActivatedRoute,
    private router: Router,
    private chatSocketService: ChatSocketService,
  ) {}


  ngOnInit(): void {
    this.getMessages();
    this.listenToChatSocket();
    
  }

  getMessages() {
    this.chatService.getAll().subscribe({
      next: (data) =>{
        console.log(data);
        this.messages = data;
        this.scrollToBottom();
      }
     
    });

  }

  listenToChatSocket() {
    this.chatSocketService.receiveMessages().subscribe(data => {
      this.messages?.push(data);
      // scroll to bottom if its my message
      if (data.senderId === this.userId) {
        this.scrollToBottom();
      }
    })
  }

  scrollToBottom() {
    setTimeout(() => {
      const messagesContainerEle = document.getElementById('messages-container');
      if (messagesContainerEle) {
        messagesContainerEle.scrollTo({
        top: messagesContainerEle.scrollHeight + 1000,
        behavior: 'smooth'
      });

      }
    }, 500);
  }
  

  sendMessage(newMessage: string) {
    this.newMessage = '';
    this.chatSocketService.sendMessage(newMessage);
    //TOOD: Add notification for new message
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['../auth/login'], {relativeTo: this.route});
  }

}
