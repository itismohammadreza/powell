import {Component} from '@angular/core';
import {LanguageChecker} from '@core/utils';
import {GlobalConfig} from "@core/global.config";

@Component({
  selector: 'ng-main-page',
  styleUrls: ['main.page.scss'],
  templateUrl: './main.page.html',
  animations: [GlobalConfig.routeAnimation]
})
export class MainPage extends LanguageChecker {
  constructor() {
    super();
  }
}
