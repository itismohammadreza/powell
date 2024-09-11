import {Component, inject} from '@angular/core';
import {ConfigService, OverlayService} from "@powell/api";
import {NgDialogOptions} from "@powell/models";

@Component({
  selector: 'ng-dialog-page',
  templateUrl: './dialog.page.html',
  styleUrls: ['./dialog.page.scss']
})
export class DialogPage {
  private overlayService = inject(OverlayService);
  private configService = inject(ConfigService);

  dialog: NgDialogOptions = {
    header: 'Dialog',
    draggable: false,
    resizable: false,
    modal: true,
    position: 'center',
    blockScroll: false,
    closeOnEscape: false,
    dismissableMask: false,
    closable: true,
    showHeader: true,
    maximizable: true,
    buttonIcon: '',
    buttonIconPos: 'right',
    buttonFull: false,
    buttonLabel: 'Ok',
    buttonColor: 'primary',
    buttonAppearance: 'basic',
    buttonSize: 'md',
    rtl: this.configService.get().rtl,
    content: 'Some content inside dialog.',
  }

  showDialog() {
    this.overlayService.showDialog(this.dialog)
  }
}
