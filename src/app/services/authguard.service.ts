import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): boolean {
    //when use custom authgurad service (class based - deprecated)
    // if (this.auth.authchekForRoute) {
    //   console.log('User is authenticated');
    //   return true;
    // }
    // this.router.navigate(['/']);
    return false;
  }
}
