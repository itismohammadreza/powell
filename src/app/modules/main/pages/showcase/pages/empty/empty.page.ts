import {Component, inject} from '@angular/core';
import {NgEmptyIcon} from "@powell/models";
import {ConfigService} from "@powell/api";
import {EmptyModule} from "@powell/components/empty";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {
  PreviewOptionsComponent
} from "@modules/main/pages/showcase/components/preview-options/preview-options.component";

@Component({
  selector: 'ng-empty-page',
  templateUrl: './empty.page.html',
  styleUrls: ['./empty.page.scss'],
  imports: [
    EmptyModule,
    ExtrasModule,
    PreviewOptionsComponent
  ]
})
export class EmptyPage {
  private configService = inject(ConfigService);

  imageType: NgEmptyIcon = 'box1';
  icon: string = '';
  text: string = '';
  rtl: boolean = this.configService.get().rtl;
  followConfig: boolean = this.configService.get().followConfig;
}
