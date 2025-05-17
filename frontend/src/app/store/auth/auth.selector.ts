import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.model';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(selectAuthState, (state) => state.user);

export const selectToken = createSelector(selectAuthState, (state) => state.token);

export const selectRefreshToken = createSelector(selectAuthState, (state) => state.refreshToken);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated,
);

export const selectIsLoading = createSelector(selectAuthState, (state) => state.isLoading);

export const selectError = createSelector(selectAuthState, (state) => state.error);

export const selectLastActivity = createSelector(selectAuthState, (state) => state.lastActivity);

// Combined selector for multiple properties
export const selectAuthStatus = createSelector(
  selectUser,
  selectIsAuthenticated,
  selectIsLoading,
  selectError,
  (user, isAuthenticated, isLoading, error) => ({
    user,
    isAuthenticated,
    isLoading,
    error,
  }),
);
