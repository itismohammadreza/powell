import {Component} from '@angular/core';
import {appConfig} from "@core/config";

@Component({
  selector: 'ng-main-page',
  styleUrls: ['main.page.scss'],
  templateUrl: './main.page.html',
  animations: [appConfig.routeAnimation]
})
export class MainPage {
}
