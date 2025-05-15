import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLS } from '../../environments/urls.env';
import { Observable } from 'rxjs';
import { LoginResponse, RegisterResponse } from '../store/auth/auth.model';
import { AuthActions } from '../store/auth/auth.actions';
import { Store } from '@ngrx/store';
import { selectToken } from '../store/auth/auth.selector';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private store: Store,
  ) { }

  login(email: string, password: string): Observable<LoginResponse> {
    this.store.dispatch(AuthActions.login({ email, password }));
    return this.http.post<LoginResponse>(URLS.AUTH.LOGIN, { email, password });
  }

  register(name: string, email: string, password: string): Observable<RegisterResponse> {
    this.store.dispatch(AuthActions.register({ name, email, password }));
    return this.http.post<RegisterResponse>(URLS.AUTH.REGISTER, { name, email, password });
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  getToken(): string | null {
    let token: string | null = null;
    this.store
      .select(selectToken)
      .subscribe((t) => (token = t))
      .unsubscribe();
    return token;
  }

  refreshToken(refreshToken: string): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(
      URLS.AUTH.REFRESH_TOKEN,
      { refresh_token: refreshToken }
    );
  }

  initializeAuthState(): void {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.store.dispatch(AuthActions.autoLogin());
    }
  }
}
