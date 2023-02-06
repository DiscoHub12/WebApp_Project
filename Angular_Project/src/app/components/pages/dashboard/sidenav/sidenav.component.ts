import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Models/employee';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  @Output() selectedComponent: string | undefined;

  userType: any;

  constructor(private router: Router, private authUser: UserService) { }

  ngOnInit() {
    this.userType = this.authUser.getUser();
  }

  changeRoute(route: string) {
    if (this.userType instanceof User) {
      if (route === '/card') {
        this.router.navigate(['/dashboard/user/card']);
      }
      else if (route === '/booking') {
        this.router.navigate(['/dashboard/user/booking']);
      }
      else if (route === '/products') {
        this.router.navigate(['/dashboard/user/products']);
      }
      else if (route === '/treatments') {
        this.router.navigate(['/dashboard/user/treatments']);
      }
    }

    if (this.userType instanceof Employee) {
      {
        if (route === '/card') {
          this.router.navigate(['/dashboard/employee/card']);
        }
        else if (route === '/booking') {
          this.router.navigate(['/dashboard/employee/booking']);
        }
        else if (route === '/products') {
          this.router.navigate(['/dashboard/employee/products']);
        }
        else if (route === '/treatments') {
          this.router.navigate(['/dashboard/employee/treatments']);
        }
      }
    }
  }
}
