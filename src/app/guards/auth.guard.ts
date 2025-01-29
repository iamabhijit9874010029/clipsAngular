import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

//when use custom authgurad service (functional - new)

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.authchekForRoute) {
    router.navigate(['/']);
    console.log('User is not authenticated!');
    return false;
  }
  return true;
};
