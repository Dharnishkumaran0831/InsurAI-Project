import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private API = 'https://insurai-backend-rarh.onrender.com/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.API}/login`, { email, password }).toPromise();
  }

  register(data: any) {
    return this.http.post(`${this.API}/register`, data).toPromise();
  }
}
