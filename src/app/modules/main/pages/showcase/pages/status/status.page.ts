import {Component, inject} from '@angular/core';
import {NgStatusIcon} from "@powell/models";
import {ConfigService} from "@powell/api";

@Component({
  selector: 'ng-status-page',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss']
})
export class StatusPage {
  private configService = inject(ConfigService);

  status: NgStatusIcon = 'info';
  text: string = '';
  subText: string = '';
  rtl: boolean = this.configService.getConfig().rtl;
  followConfig: boolean = this.configService.getConfig().followConfig;
}
