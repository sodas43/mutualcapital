import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate() {
    let User = JSON.parse(localStorage.getItem('UserDetails'));
    console.log("will return 1 : "+(User ? true : false));
    if (User) { return true; }

    this.router.navigate(['signup']);
    return false;
  }
}
