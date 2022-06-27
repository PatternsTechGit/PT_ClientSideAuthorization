import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  // @ts-ignore: Object is possible 'null'
  @Input() inputSideNav:MatSidenav
  constructor() { }

  ngOnInit(): void {
  }

}
