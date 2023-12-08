import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLogged(): boolean {
    return !!window.localStorage.getItem('accessToken');
  }

  login(username: string, password: string): boolean {
    if(username === 'admin' && password === '123456') {
      window.localStorage.setItem('accessToken', '123456');
      return true;
    }
    return false;
  }

  getAccessToken(): string | null {
    return window.localStorage.getItem('accessToken');
  }

  logout(): void {
    window.localStorage.clear();
  }
}
