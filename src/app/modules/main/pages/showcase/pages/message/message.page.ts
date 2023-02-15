import {Component, Inject} from '@angular/core';
import {NgSeverity} from "@ng/models/overlay";
import {NgConfig} from "@ng/models/config";

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
  rtl: boolean = this.ngConfig.rtl;
}
