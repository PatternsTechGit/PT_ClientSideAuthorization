import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AppUser } from '../models/AppUser';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  // @ts-ignore: Object is possible 'null'
  @Input() inputSideNav:MatSidenav
  loggedInUser?: AppUser;
constructor(private authService: AuthService) { }
   

ngOnInit(): void {
  this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')|| '{}');
}
logout(): void {
  this.authService.logout();
}

}
