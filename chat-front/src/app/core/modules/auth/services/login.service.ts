import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../services/api.service';

interface LoginBody {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = '/auth';

  constructor(private apiService: ApiService) { }

  login(body: LoginBody): Observable<any> {
    return this.apiService.post(this.baseUrl +  '/login', body);
  }
}
