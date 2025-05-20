import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  serviceUrl = '/messages';
  constructor(private apiService: ApiService) { }

  getAll(): Observable<any> {
    return this.apiService.get(this.serviceUrl);
  }

  create(message: string): Observable<any> {
    return this.apiService.post(this.serviceUrl, {message: message, senderId: 1});
  }
}
