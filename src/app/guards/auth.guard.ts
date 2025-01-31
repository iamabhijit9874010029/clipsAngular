import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs';

//when use custom authgurad service (functional - new)

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated$.pipe(
    take(1), // Take only one value and complete
    map(isAuthenticated => {
      if (!isAuthenticated) {
        console.log('User is not authenticated! Redirecting to login...', isAuthenticated);
        router.navigate(['/']);
        return false;
      }
      console.log('User is authenticated! Access granted.', isAuthenticated);
      return true;
    })
  );
};
