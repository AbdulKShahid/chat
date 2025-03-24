import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import { ChatMessage } from '../../../models/chat.model';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

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

  constructor(private chatService: ChatService) {}


  ngOnInit(): void {
    this.getMessages();
    
  }

  getMessages() {
    this.chatService.getAll().subscribe({
      next: (data) =>{
        console.log(data);
        this.messages = data;
      }
     
    });

  }

  sendMessage(newMessage: string) {
    this.newMessage = '';
    this.chatService.create(newMessage).subscribe({
      next: (data) =>{
        this.messages?.push(data);
      }
     
    });
  }

}
