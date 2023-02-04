import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/Models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  @Input() userType: any ;

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

}
