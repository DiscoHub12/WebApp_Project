import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() selectedComponent: string | undefined;


  currentUser : any; 
  sideBarOpen = true;
  user = new User(1, "Sofia", "Scattolini");
  userType = this.user;


  constructor() { }

  ngOnInit () {
    
  }


  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  
}
