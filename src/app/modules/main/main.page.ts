import {Component} from '@angular/core';
import {LanguageChecker} from '@core/utils';

@Component({
  selector: 'ng-main-page',
  styleUrls: ['main.page.scss'],
  templateUrl: './main.page.html',
})
export class MainPage extends LanguageChecker {
  constructor() {
    super();
  }
}
