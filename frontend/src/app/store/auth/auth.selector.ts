import { createFeature, createSelector } from '@ngrx/store';
import { authReducer } from './auth.reducer';

export const authFeature = createFeature({
  name: 'auth',
  reducer: authReducer,
  extraSelectors: ({ selectUser, selectToken, selectError, selectIsLoading }) => ({
    selectIsAuthenticated: createSelector(selectToken, (token) => !!token),
    selectAuthState: createSelector(
      selectUser,
      selectToken,
      selectError,
      selectIsLoading,
      (user, token, error, isLoading) => ({ user, token, error, isLoading }),
    ),
  }),
});

export const {
  selectUser,
  selectToken,
  selectError,
  selectIsLoading,
  selectIsAuthenticated,
  selectAuthState,
} = authFeature;
