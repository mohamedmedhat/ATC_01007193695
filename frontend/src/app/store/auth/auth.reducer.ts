import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { Role } from '../../shared/enums/Role.enum';

export interface AuthState {
    user: {
        id: string;
        email: string;
        name: string;
        roles: Role[];
    } | null;
    token: string | null;
    refreshToken: string | null;
    error: string | null;
    isLoading: boolean;
    lastActivity: number | null; // For session tracking
}

export const initialState: AuthState = {
    user: null,
    token: null,
    refreshToken: null,
    error: null,
    isLoading: false,
    lastActivity: null
};

export const authReducer = createReducer(
    initialState,
    on(AuthActions.login, (state) => ({
        ...state,
        isLoading: true,
        error: null,
    })),
    on(AuthActions.loginSuccess, (state, { response }) => ({
        ...state,
        user: {
            id: response.id,
            email: '',      // You might want to get these from the response
            name: '',       // You might want to get these from the response
            roles: []       // Add empty array or get from response if available
        },
        token: response.access_token,
        refreshToken: response.refresh_token,
        isLoading: false,
        error: null,
        lastActivity: Date.now()
    })),
    on(AuthActions.loginFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error,
    })),
    on(AuthActions.refreshToken, (state) => ({
        ...state,
        isLoading: true
    })),
    on(AuthActions.refreshTokenSuccess, (state, { token }) => ({
        ...state,
        token,
        isLoading: false,
        error: null,
        lastActivity: Date.now()
    })),
    on(AuthActions.refreshTokenFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),

    // Add auto-login cases
    on(AuthActions.autoLogin, (state) => ({
        ...state,
        isLoading: true
    })),
    on(AuthActions.autoLoginSuccess, (state, { token }) => ({
        ...state,
        token,
        isLoading: false
    })),
    on(AuthActions.autoLoginFailure, (state) => ({
        ...state,
        isLoading: false,
        token: null,
        refreshToken: null
    })),
    on(AuthActions.logout, () => initialState),
);
