import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit(): void {
  }

  login() {

    // calling the login() method in the auth service
    this.authService.login()
      .subscribe(user => {
        console.log("Is Login Success: " + user);

        // check whether the user object has the data
        if (user) {
          // navigate to application home page
          this.router.navigate(['/'])
          .then(() => {
            window.location.reload();
          });
        }
      });
  }

}
