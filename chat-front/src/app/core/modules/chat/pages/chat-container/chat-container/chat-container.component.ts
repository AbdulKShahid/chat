import { Component } from '@angular/core';
import { ChatWindowComponent } from '../../../components/chat-window/chat-window/chat-window.component';

@Component({
  selector: 'app-chat-container',
  standalone: true,
  imports: [ChatWindowComponent],
  templateUrl: './chat-container.component.html',
  styleUrl: './chat-container.component.scss'
})
export class ChatContainerComponent {

}
