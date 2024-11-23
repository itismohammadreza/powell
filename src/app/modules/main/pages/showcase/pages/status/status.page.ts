import {Component, inject} from '@angular/core';
import {NgStatusIcon} from "@powell/models";
import {ConfigService} from "@powell/api";
import {StatusModule} from "@powell/components/status";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {
  PreviewOptionsComponent
} from "@modules/main/pages/showcase/components/preview-options/preview-options.component";

@Component({
  selector: 'ng-status-page',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
  imports: [
    StatusModule,
    ExtrasModule,
    PreviewOptionsComponent
  ]
})
export class StatusPage {
  private configService = inject(ConfigService);

  status: NgStatusIcon = 'info';
  text: string = '';
  subText: string = '';
  rtl: boolean = this.configService.get().rtl;
  followConfig: boolean = this.configService.get().followConfig;
}
