import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLS } from '../../environments/urls.env';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(URLS.AUTH.LOGIN, { email, password });
  }

  register(name: string, email: string, password: string) {
    return this.http.post(URLS.AUTH.REGISTER, { name, email, password });
  }
}
