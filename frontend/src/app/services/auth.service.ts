import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = 'https://insurai-backend-rarh.onrender.com/api/auth';

  constructor(private http: HttpClient) {}

  // LOGIN
  login(email: string, password: string) {
    return this.http.post<LoginResponse>(
      `${this.BASE_URL}/login`,
      { email, password }
    );
  }

  // REGISTER
  register(data: any) {
    return this.http.post(
      'https://insurai-backend-rarh.onrender.com/api/auth/register',
      data,
      { responseType: 'text' } // ⭐ IMPORTANT
    );
  }
}
