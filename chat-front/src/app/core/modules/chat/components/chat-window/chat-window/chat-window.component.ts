import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import { ChatMessage } from '../../../models/chat.model';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatSocketService } from '../../../../../services/chat-socket.service';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [MatInputModule, FormsModule, DatePipe],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent implements OnInit{
  messages: ChatMessage[] | undefined = undefined;
  newMessage: string = '';

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
      }
     
    });

  }

  listenToChatSocket() {
    this.chatSocketService.receiveMessages().subscribe(data => {
      this.messages?.push(data);
    })

  }

  sendMessage(newMessage: string) {
    this.newMessage = '';
    this.chatSocketService.sendMessage(newMessage);
    // this.chatService.create(newMessage).subscribe({
    //   next: (data) =>{
    //     this.messages?.push(data);
    //   }
     
    // });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['../auth/login'], {relativeTo: this.route});
  }

}
