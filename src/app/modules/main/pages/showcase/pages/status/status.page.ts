import {Component} from '@angular/core';
import {NgStatusIcon} from "@powell/models";
import {ConfigService} from "@powell/api";

@Component({
  selector: 'ng-status-page',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss']
})
export class StatusPage {
  constructor(private configService: ConfigService) {
  }

  status: NgStatusIcon = 'info';
  icon: string = '';
  text: string = '';
  subText: string = '';
  rtl: boolean = this.configService.getConfig().rtl;
  disableConfigChangeEffect: boolean = this.configService.getConfig().disableConfigChangeEffect;
}
