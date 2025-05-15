import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectToken } from '../../store/auth/auth.selector';
import { AuthService } from '../../services/auth.service';
import { AuthActions } from '../../store/auth/auth.actions';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  const router = inject(Router);
  const authService = inject(AuthService);


  // Skip for auth requests
  if (req.url.includes('/auth/')) {
    return next(req);
  }

  // Get token synchronously
  let token: string | null = null;
  store.select(selectToken).subscribe(t => token = t).unsubscribe();

  // Clone request with token
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError(error => {
      if (error.status === 401) {
        // Attempt token refresh if 401
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          return authService.refreshToken(refreshToken).pipe(
            switchMap(({ access_token }) => {
              localStorage.setItem('access_token', access_token);
              store.dispatch(AuthActions.refreshTokenSuccess({ token: access_token }));
              const newReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${access_token}`
                }
              });
              return next(newReq);
            }),
            catchError(() => {
              authService.logout();
              router.navigate(['/login']);
              return throwError(() => error);
            })
          );
        } else {
          authService.logout();
          router.navigate(['/login']);
        }
      }
      return throwError(() => error);
    })
  );
};
