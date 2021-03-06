import { Component, OnInit } from '@angular/core';
import { SidebarService, UserService } from '../../services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(
    public sidebarService: SidebarService,
    public userService: UserService) {}

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
  }

}
