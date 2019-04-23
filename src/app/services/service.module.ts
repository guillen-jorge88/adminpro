import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import {
  SetttingService,
  SharedService,
  SidebarService,
  UploadFileService,
  LoginGuard,
  UserService
} from './service.index';


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
    UploadFileService,
    LoginGuard
  ]
})
export class ServiceModule { }
