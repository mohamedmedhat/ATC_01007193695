import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AuthActions } from './auth.action';

export const checkAuth$ = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(AuthActions.checkAuth),
      switchMap(() =>
        authService.refreshToken().pipe(
          map(({ access_token }) => AuthActions.checkAuthSuccess({ token: access_token })),
          catchError(() => {
            return of(AuthActions.checkAuthFailure());
          }),
        ),
      ),
    );
  },
  { functional: true },
);

export const login$ = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(AuthActions.login),
      tap(() => console.log('Login action dispatched')),
      switchMap(({ req }) =>
        authService.login(req).pipe(
          tap((response) => console.log('Login response:', response)), // Add this
          map((response) => AuthActions.loginSuccess({ response })),
          catchError((error) => of(AuthActions.loginFailure({ error: error.message }))),
        ),
      ),
    );
  },
  { functional: true },
);

export const logout$ = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() =>
        authService.logout().pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError(() => of(AuthActions.logoutSuccess())), // Always proceed with logout
        ),
      ),
    );
  },
  { functional: true },
);

export const register$ = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ req }) =>
        authService.register(req).pipe(
          map((response) => AuthActions.registerSuccess({ response })),
          catchError((error) => {
            const errorMsg = error.error?.message || error.message || 'Registration failed';
            return of(AuthActions.registerFailure({ error: errorMsg }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);

export const refreshToken$ = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(AuthActions.refreshToken),
      switchMap(() =>
        authService.refreshToken().pipe(
          map(({ access_token }) => AuthActions.refreshTokenSuccess({ token: access_token })),
          catchError((error) => of(AuthActions.refreshTokenFailure({ error: error.message }))),
        ),
      ),
    );
  },
  { functional: true },
);

export const autoLogin$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(AuthActions.autoLogin),
      switchMap(() => {
        const token = localStorage.getItem('access_token');
        if (!token) return of(AuthActions.autoLoginFailure());

        return of(AuthActions.autoLoginSuccess({ token }));
      }),
    );
  },
  { functional: true },
);

export const authEffects = { login$, register$, autoLogin$, checkAuth$, logout$ };
