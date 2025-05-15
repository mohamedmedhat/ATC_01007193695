import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '../../store/auth/auth.selector';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store
    .select(selectIsAuthenticated)
    .pipe(map((isAuthenticated) => isAuthenticated || router.createUrlTree(['/login'])));
};
