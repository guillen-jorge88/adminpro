import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SetttingService } from '../../services/service.index';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {
  constructor( public _setting: SetttingService) { }

  ngOnInit() {
    this.apllyDefaultCheck();
  }

  changeTheme(theme: string, link: any) {
    this.apllyCheck(link);
    this._setting.applyTheme(theme);
  }

  apllyCheck(link: any) {
    let selectors: any = document.getElementsByClassName('selector');

    for (let ref of selectors) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  apllyDefaultCheck() {
    let selectors: any = document.getElementsByClassName('selector');
    let theme = this._setting.settings.theme;
    for (let ref of selectors) {
      if (ref.getAttribute('data-theme') === theme) {
        ref.classList.add('working');
        break;
      }
    }
  }
}
