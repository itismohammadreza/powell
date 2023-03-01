import {Component, Inject} from '@angular/core';
import {NgSeverity} from "@ng/models/overlay";
import {ConfigService} from "@ng/services";

@Component({
  selector: 'ng-message-page',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss']
})
export class MessagePage {
  summary: string = 'Some summary';
  detail: string = 'a complete detail';
  icon: string = 'pi pi-info';
  severity: NgSeverity = 'info';
  inlineMessage: string = '';
  closable: boolean = false;
  rtl: boolean = this.configService.getConfig().rtl;
  disableConfigChangeEffect: boolean = this.configService.getConfig().disableConfigChangeEffect;

  constructor(private configService: ConfigService) {
  }
}
