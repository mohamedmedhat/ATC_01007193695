import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.action';
import { AuthState } from './auth.model';

export const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  lastActivity: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.checkAuth, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(AuthActions.checkAuthSuccess, (state, { token }) => ({
    ...state,
    token,
    isAuthenticated: true,
    isLoading: false,
    lastActivity: Date.now(),
  })),
  on(AuthActions.checkAuthFailure, (state) => ({
    ...state,
    isAuthenticated: false,
    isLoading: false,
  })),
  on(AuthActions.register, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(AuthActions.registerSuccess, (state, { response }) => ({
    ...state,
    user: {
      id: response.id,
      email: response.email,
      name: response.name,
      roles: response.roles,
    },
    isLoading: false,
    error: null,
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(AuthActions.login, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state, { response }) => ({
    ...state,
    user: {
      id: response.id,
      email: response.email,
      name: response.name,
      roles: response.roles,
    },
    token: response.access_token,
    refreshToken: response.refresh_token,
    isAuthenticated: true,
    isLoading: false,
    error: null,
    lastActivity: Date.now(),
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(AuthActions.refreshToken, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(AuthActions.refreshTokenSuccess, (state, { token }) => ({
    ...state,
    token,
    isLoading: false,
    error: null,
    lastActivity: Date.now(),
  })),
  on(AuthActions.refreshTokenFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(AuthActions.logoutSuccess, () => initialState),
  on(AuthActions.logoutFailure, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(AuthActions.autoLogin, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(AuthActions.autoLoginSuccess, (state, { token }) => ({
    ...state,
    token,
    isAuthenticated: true,
    isLoading: false,
    lastActivity: Date.now(),
  })),
  on(AuthActions.autoLoginFailure, (state) => ({
    ...state,
    isLoading: false,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
  })),
);
