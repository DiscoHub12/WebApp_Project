import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  @Output() selectedComponent : string | undefined ;

  userType = "user";

  constructor(private router : Router) {}

  ngOnInit() {}

  changeRoute(route: string) {
    this.router.navigate([route]);
  }

}
