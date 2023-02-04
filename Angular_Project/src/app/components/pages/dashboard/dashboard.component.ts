import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
//import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  currentUser : any; 
  sideBarOpen = true;

  constructor () {}

  userType = "user"
  


  ngOnInit () {
    //this.currentUser = this.authService.getUserData();
  }


  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  
}
