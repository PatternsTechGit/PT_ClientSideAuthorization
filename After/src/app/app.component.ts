import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isUserLoggedIn?: boolean;
  constructor(private authService: AuthService) { 
   
  }
  ngOnInit(): void {
    this.isUserLoggedIn =  localStorage.getItem('loggedInUser') != null;
  }
  title = 'BBBankUI';
}
