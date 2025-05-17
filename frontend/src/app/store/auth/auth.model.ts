import { Role } from '../../shared/enums/Role.enum';

export interface LoginResponse {
  id: string;
  name: string;
  email: string;
  roles: Role[];
  access_token: string;
  refresh_token: string;
}

export interface RegisterResponse {
  id: string;
  name: string;
  email: string;
  roles: Role[];
}

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface AuthState {
  user: {
    id: string;
    email: string;
    name: string;
    roles: Role[];
  } | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  lastActivity: unknown | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
