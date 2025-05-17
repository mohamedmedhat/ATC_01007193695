import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLS } from '../../environments/urls.env';
import { Observable } from 'rxjs';
import {
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  RegisterRequest,
  RegisterResponse,
} from '../store/auth/auth.model';
import { AuthActions } from '../store/auth/auth.action';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessToken: string | null = null;

  constructor(
    private http: HttpClient,
    private store: Store,
  ) {}

  login(req: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(URLS.AUTH.LOGIN, req, {
      withCredentials: true,
    });
  }

  register(req: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(URLS.AUTH.REGISTER, req, {
      withCredentials: true,
    });
  }

  logout() {
    this.accessToken = null;
    this.store.dispatch(AuthActions.logout());
    return this.http.post(URLS.AUTH.LOGOUT, {
      withCredentials: true,
    });
  }

  getToken(): string | null {
    return this.accessToken;
  }

  refreshToken(): Observable<RefreshTokenResponse> {
    return this.http.post<RefreshTokenResponse>(
      URLS.AUTH.REFRESH_TOKEN,
      {},
      { withCredentials: true },
    );
  }

  initializeAuthState(): void {
    if (this.getToken()) {
      this.store.dispatch(AuthActions.checkAuth());
    }
  }
}
