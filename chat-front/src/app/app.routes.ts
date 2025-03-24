import { Routes } from '@angular/router';
import { ChatContainerComponent } from './core/modules/chat/pages/chat-container/chat-container/chat-container.component';

export const routes: Routes = [
    {
        path: '',
        component: ChatContainerComponent,
    },
    {
        path: 'messages',
        component: ChatContainerComponent,
    }
];
