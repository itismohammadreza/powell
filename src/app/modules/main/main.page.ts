import {Component} from '@angular/core';
import {Global} from "@core/config";

@Component({
  selector: 'ng-main-page',
  styleUrls: ['main.page.scss'],
  templateUrl: './main.page.html',
  animations: [Global.Config.routeAnimation]
})
export class MainPage {
}
