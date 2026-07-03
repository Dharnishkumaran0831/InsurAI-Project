import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  setLoggedInUser(email: string, fullName: string) {
    localStorage.setItem('email', email);
    localStorage.setItem('fullName', fullName);
  }
}
