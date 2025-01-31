import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> {
    //when use custom authgurad service (class based - deprecated)
    return this.auth.isAuthenticated$.pipe(
      take(1), // Take only one value and complete
      map(isAuthenticated => {
        if (!isAuthenticated) {
          console.log('User is not authenticated! Redirecting to login...', isAuthenticated);
          this.router.navigate(['/']);
          return false;
        }
        console.log('User is authenticated! Access granted.', isAuthenticated);
        return true;
      })
    );
  }
}
