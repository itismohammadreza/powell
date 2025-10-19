import {Component} from '@angular/core';
import {globalConfig} from "@core/config";

@Component({
  selector: 'app-main-page',
  templateUrl: './main.page.html',
  animations: [globalConfig.routeAnimation],
  standalone: false
})
export class MainPage {
}
