import {Component, Inject} from '@angular/core';
import {OverlayService} from "@ng/services";
import {NgDialogOptions} from "@ng/models/overlay";
import {ConfigService} from "@ng/services";

@Component({
  selector: 'ng-dialog',
  templateUrl: './dialog.page.html',
  styleUrls: ['./dialog.page.scss']
})
export class DialogPage {
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
    rtl: this.configService.getConfig().rtl,
    content: 'Some content inside dialog.',
  }

  constructor(private overlayService: OverlayService, private configService: ConfigService) {
  }

  showDialog() {
    this.overlayService.showDialog(this.dialog)
  }
}
