import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetttingService, SharedService, SidebarService } from './service.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    SetttingService,
    SharedService,
    SidebarService
  ]
})
export class ServiceModule { }
