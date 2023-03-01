import {Component} from '@angular/core';
import {NgStatus} from "@ng/models/offset";
import {ConfigService} from "@ng/services";

@Component({
  selector: 'ng-status-page',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss']
})
export class StatusPage {
  constructor(private configService: ConfigService) {
  }

  status: NgStatus = 'info';
  icon: string = '';
  text: string = '';
  subText: string = '';
  rtl: boolean = this.configService.getConfig().rtl;
  disableConfigChangeEffect: boolean = this.configService.getConfig().disableConfigChangeEffect;
}
