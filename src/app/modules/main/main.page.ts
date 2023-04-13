import {Component} from '@angular/core';
import {Global} from "@core/config";

@Component({
  selector: 'ng-main-page',
  styleUrls: ['main.page.scss'],
  templateUrl: './main.page.html',
  animations: [Global.config.routeAnimation]
})
export class MainPage {
}
