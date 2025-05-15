import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AuthActions } from './auth.actions';

export const login$ = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ email, password }) =>
        authService.login(email, password).pipe(
          map((response) => AuthActions.loginSuccess({ response })),
          catchError((error) => of(AuthActions.loginFailure({ error: error.message }))),
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
      switchMap(({ name, email, password }) =>
        authService.register(name, email, password).pipe(
          map((response) => AuthActions.registerSuccess({ response })),
          catchError((error) => of(AuthActions.registerFailure({ error: error.message }))),
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
      switchMap(() => {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) return of(AuthActions.refreshTokenFailure({ error: 'No refresh token' }));
        
        return authService.refreshToken(refreshToken).pipe(
          map(({ access_token }) => AuthActions.refreshTokenSuccess({ token: access_token })),
          catchError(error => of(AuthActions.refreshTokenFailure({ error: error.message })))
        );
      })
    );
  },
  { functional: true }
);

export const authEffects = { login$, register$, refreshToken$ };
