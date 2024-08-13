import {Component} from '@angular/core';
import {globalConfig} from "@core/config";

@Component({
  selector: 'ng-main-page',
  styleUrls: ['main.page.scss'],
  templateUrl: './main.page.html',
  animations: [globalConfig.routeAnimation]
})
export class MainPage {
}
