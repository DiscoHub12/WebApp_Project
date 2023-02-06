import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  @Output() selectedComponent : string | undefined ;

  userType : any;

  constructor(private router : Router, private authUser : UserService) {}

  ngOnInit() {
    this.userType = this.authUser.getUser();
  }

  changeRoute(route: string) {
    this.router.navigate([route]);
  }

}
