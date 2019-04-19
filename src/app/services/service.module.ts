import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetttingService, SharedService, SidebarService } from './service.index';
import { UserService } from './user/user.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuard } from './guards/login.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SetttingService,
    SharedService,
    SidebarService,
    UserService,
    LoginGuard
  ]
})
export class ServiceModule { }
