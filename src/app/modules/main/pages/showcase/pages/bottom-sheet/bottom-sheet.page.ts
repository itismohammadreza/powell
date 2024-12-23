import {Component, inject} from '@angular/core';
import {ConfigService, OverlayService} from "@powell/api";
import {BottomSheetModule} from "@powell/components/bottom-sheet";
import {ButtonModule} from "@powell/components/button";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {
  PreviewOptionsComponent
} from "@modules/main/pages/showcase/components/preview-options/preview-options.component";

@Component({
  selector: 'ng-bottom-sheet-page',
  templateUrl: './bottom-sheet.page.html',
  styleUrls: ['./bottom-sheet.page.scss'],
  imports: [
    BottomSheetModule,
    ButtonModule,
    ExtrasModule,
    PreviewOptionsComponent
  ]
})
export class BottomSheetPage {
  private overlayService = inject(OverlayService);
  private configService = inject(ConfigService);

  blockScroll: boolean = false;
  modal: boolean = true;
  dismissible: boolean = true;
  showCloseIcon: boolean = true;
  closeOnEscape: boolean = true;
  header: string = 'BottomSheet Header';
  rtl: boolean = this.configService.get().rtl;
  followConfig: boolean = this.configService.get().followConfig;

  visible = false;
  visible2 = false;
  visible3 = false;
  visible4 = false;

  async openDialog() {
    await this.overlayService.showConfirmDialog({message: 'asdsad'})
    this.visible4 = true
  }
}
