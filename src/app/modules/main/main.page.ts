import {Component} from '@angular/core';
import {globalConfig} from "@core/config";

@Component({
  selector: 'main-page',
  styleUrls: ['main.page.scss'],
  templateUrl: './main.page.html',
  animations: [globalConfig.routeAnimation],
  standalone: false
})
export class MainPage {
}
