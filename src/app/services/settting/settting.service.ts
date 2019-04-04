import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SetttingService {
  settings: Settings = {
    themeUrl: 'assets/css/colors/default.css',
    theme: 'default'
  };

// tslint:disable-next-line: variable-name
  constructor(@Inject(DOCUMENT) private _document) {
    this.loadSetting();
  }

  saveSettings() {
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  loadSetting() {
    if (localStorage.getItem('settings')) {
      this.settings = JSON.parse(localStorage.getItem('settings'));
    } else {
      console.log(`using default values: ${JSON.stringify(this.settings) }`);
    }
    this.applyTheme(this.settings.theme);
  }

  applyTheme(theme: string) {
// tslint:disable-next-line: prefer-const
    let url = `assets/css/colors/${theme}.css`;
    this._document.getElementById('theme').setAttribute('href', url);

    this.settings.theme = theme;
    this.settings.themeUrl = url;
    this.saveSettings();
  }
}

interface Settings {
  themeUrl: string;
  theme: string;
}
