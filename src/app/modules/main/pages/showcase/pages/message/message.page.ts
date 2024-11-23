import {Component, inject} from '@angular/core';
import {NgSeverity} from "@powell/models";
import {ConfigService} from "@powell/api";
import {MessageModule} from "@powell/components/message";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {
  PreviewOptionsComponent
} from "@modules/main/pages/showcase/components/preview-options/preview-options.component";

@Component({
  selector: 'ng-message-page',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
  imports: [
    MessageModule,
    ExtrasModule,
    PreviewOptionsComponent
  ]
})
export class MessagePage {
  private configService = inject(ConfigService);

  summary: string = 'Some summary';
  detail: string = 'a complete detail';
  icon: string = 'pi pi-info';
  severity: NgSeverity = 'info';
  inlineMessage: string = '';
  closable: boolean = false;
  rtl: boolean = this.configService.get().rtl;
  followConfig: boolean = this.configService.get().followConfig;
}
