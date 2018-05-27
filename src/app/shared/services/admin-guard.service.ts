import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class AdminGuardService {

  constructor(
    private router: Router
  ) { }

  canActivate() {
    let User = JSON.parse(localStorage.getItem('UserDetails'));
    if (User) {
      if (User['isAdmin'] == true) { return true; }
    }
    //console.log("will return 1 : "+(User ? true : false));    

    this.router.navigate(['signup']);
    return false;
  }

}
