import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent implements OnInit{
  messages: any;

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
     
    })

  }

}
