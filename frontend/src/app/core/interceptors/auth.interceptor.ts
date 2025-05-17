import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap, take, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectToken } from '../../store/auth/auth.selector';
import { AuthService } from '../../services/auth.service';
import { AuthActions } from '../../store/auth/auth.action';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  const router = inject(Router);
  const authService = inject(AuthService);

  // Skip for auth requests
  if (req.url.includes('/auth/')) {
    return next(req);
  }

  return store.select(selectToken).pipe(
    take(1),
    switchMap((token) => {
      const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

      console.log('Interceptor: Request to', req.url); // Add this

      return next(authReq).pipe(
        catchError((error) => {
          if (error.status === 401) {
            return authService.refreshToken().pipe(
              switchMap(({ access_token }) => {
                store.dispatch(AuthActions.refreshTokenSuccess({ token: access_token }));
                return next(
                  req.clone({
                    setHeaders: { Authorization: `Bearer ${access_token}` },
                  }),
                );
              }),
              catchError(() => {
                authService.logout();
                router.navigate(['/login']);
                return throwError(() => error);
              }),
            );
          }
          return throwError(() => error);
        }),
      );
    }),
  );
};
