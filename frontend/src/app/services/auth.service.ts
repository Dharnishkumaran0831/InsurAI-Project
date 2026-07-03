import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = 'http://localhost:8080/api/auth';

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
    'http://localhost:8080/api/auth/register',
    data,
    { responseType: 'text' } // ⭐ IMPORTANT
  );
}
}
