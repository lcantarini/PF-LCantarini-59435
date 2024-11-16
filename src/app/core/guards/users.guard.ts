import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const usersGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService
  .verifyAdmin()
  .pipe(map((isValid) => isValid || router.createUrlTree(['auth', 'login'])
    )
  );
};