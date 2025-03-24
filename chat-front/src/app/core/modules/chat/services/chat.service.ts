import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  baseUrl = 'http://localhost:3000'
  constructor(private apiService: ApiService) { }

  getAll(): Observable<any> {

    return this.apiService.get(this.baseUrl + '/messages');
  }
}
