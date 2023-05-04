import {Component} from '@angular/core';
import {ConfigService, OverlayService} from "@powell/api";
import {NgDialogOptions} from "@powell/models";

@Component({
  selector: 'ng-dialog-page',
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
