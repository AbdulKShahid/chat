import { Routes } from '@angular/router';
import { ChatContainerComponent } from './core/modules/chat/pages/chat-container/chat-container/chat-container.component';
import { LoginComponent } from './core/modules/auth/components/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: ChatContainerComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'messages',
        component: ChatContainerComponent,
        canActivate: [AuthGuard],
    },
    
    {
        path: 'auth/login',
        component: LoginComponent,
    }
];
