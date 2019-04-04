import { Component } from '@angular/core';
import { SetttingService } from './services/settting/settting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'adminpro';
// tslint:disable-next-line: variable-name
  constructor(public _settings: SetttingService) {

  }
}
