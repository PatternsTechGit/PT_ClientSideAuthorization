import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // check whether the localStorage has data for loggedInUser
    if (localStorage.getItem('loggedInUser') != null) {
      return true;
    }
    else {
      // navigate to login page
      return this.router.navigate(['/login']);
    }
  }

  constructor(private router: Router) { }

  
}
