import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  userType : any;

  constructor(private authUser : UserService){}

  ngOnInit () {
    this.userType = this.authUser.getUser();
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }



}
