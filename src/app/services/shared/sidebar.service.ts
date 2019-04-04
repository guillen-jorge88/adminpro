import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public menu: any = [
    {
      title: 'Principal',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Dashboard', url: '/dashboard'},
        { title: 'Progressbar', url: '/progress'},
        { title: 'Graphics', url: '/graphics1'}
      ]
    }
  ];
  constructor() { }
}
