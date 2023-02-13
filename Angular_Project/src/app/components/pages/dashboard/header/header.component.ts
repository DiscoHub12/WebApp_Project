import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Models/employee';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  userType: any;

  //Variable for associate the response Http when Logout is successful.
  response: any;

  constructor(
    private authUser: UserService, 
    private httpClient : HttpClient,
    private router: Router
    ) { }

  ngOnInit() {
    this.userType = this.authUser.getUser();
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }


  //Logout method -- finire 
  logout() {
    if (this.userType instanceof User) {
      this.httpClient.post(`${environment.baseUrl}/user/logout`, {}).subscribe(
        response => {
          this.response = response;
          if (this.response.status == 201) {
            alert("Logout Successfully");
            this.router.navigate(['']);
          } else {
            alert ("Logout Failed");
          }
        }, err => {
          alert("Logout Failed");
        }
      );
    }
    if (this.userType instanceof Employee) {
      this.httpClient.post(`${environment.baseUrl}/employee/logout`, {}).subscribe(
        response => {
          this.response = response;
          if (this.response.status == 201) {
            alert("Logout Successfully");
            this.router.navigate(['']);
          } else {
            alert ("Logout Failed");
          }
        }, err => {
          alert("Logout Failed");
        }
      );
    }
  }

}
