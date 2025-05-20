import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:3000'
  constructor(private http: HttpClient) {

   }

   get(url: string): Observable<any> {
    return this.http.get(this.baseUrl + url);
   }

   post(url: string, body: any): Observable<any> {
    return this.http.post(this.baseUrl + url, body);
   }
}
