import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {delay, Observable, of } from 'rxjs';
import { AppUser } from '../models/AppUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  loggedInUser?: AppUser;

  constructor(private router: Router) { }

  login(): Observable<AppUser> {

    // initializing the user information
    this.loggedInUser = {
      firstName: 'Waqas',
      lastName: 'Tariq',
      username: 'waqastariq',
      roles: ['account-holder']
    } as AppUser;

    // saving the logged in user information in  Web Storage API (localStorage)
    localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));

    // returns the data i.e., user information using RxJs pipe
    // Also using delay of one second just to simulate the API call
    return of(this.loggedInUser).pipe(
      delay(1000)
    );
  }

  logout(): void {
    // removing logged in user information from the localStorage
    localStorage.removeItem('loggedInUser');

    // navigate to application home using router
    this.router.navigate(['/'])
      .then(() => {
        window.location.reload();
      });
  }
}
