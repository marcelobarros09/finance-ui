import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../core/error-handler.service';
import { Observable } from 'rxjs';

export interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/v1/auth`;

  constructor(protected http: HttpClient) {}

  isLogged(): boolean {
    return !!window.localStorage.getItem('accessToken');
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, {
      email,
      password,
    });
  }

  getAccessToken(): string | null {
    return window.localStorage.getItem('accessToken');
  }

  logout(): void {
    window.localStorage.clear();
  }
}
