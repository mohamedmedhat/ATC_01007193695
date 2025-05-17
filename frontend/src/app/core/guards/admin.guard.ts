import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserRoles } from '../../store/auth/auth.selector';
import { map, take } from 'rxjs';
import { Role } from '../../shared/enums/Role.enum';

export const adminGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectUserRoles).pipe(
    take(1),
    map((roles) => {
      const isAdmin = roles?.includes(Role.ADMIN);
      if (!isAdmin) {
        router.navigate(['/']);
        return false;
      }
      return true;
    }),
  );
};
