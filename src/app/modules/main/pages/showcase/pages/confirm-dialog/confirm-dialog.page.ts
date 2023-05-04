import {Component} from '@angular/core';
import {ConfigService, OverlayService} from "@powell/api";
import {NgConfirmDialogOptions} from "@powell/models";

@Component({
  selector: 'ng-confirm-dialog-page',
  templateUrl: './confirm-dialog.page.html',
  styleUrls: ['./confirm-dialog.page.scss']
})
export class ConfirmDialogPage {
  confirmDialog: NgConfirmDialogOptions = {
    closable: true,
    message: 'Are you sure?',
    icon: '',
    header: 'Confirmation',
    acceptLabel: 'Yes',
    rejectLabel: 'No',
    acceptIcon: '',
    rejectIcon: '',
    acceptVisible: true,
    rejectVisible: true,
    acceptColor: 'primary',
    acceptAppearance: 'basic',
    buttonSize: 'md',
    rejectColor: 'primary',
    rejectAppearance: 'outlined',
    closeOnEscape: false,
    dismissableMask: false,
    defaultFocus: 'accept',
    blockScroll: false,
    buttonFull: false,
    rtl: this.configService.getConfig().rtl,
    style: {width: '400px'}
  }

  constructor(private overlayService: OverlayService, private configService: ConfigService) {
  }

  showConfirmDialog() {
    this.overlayService.showConfirmDialog(this.confirmDialog)
  }
}
