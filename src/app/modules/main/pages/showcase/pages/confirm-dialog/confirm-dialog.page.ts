import {Component, Inject} from '@angular/core';
import {OverlayService} from "@ng/services";
import {NgConfirmDialogOptions} from "@ng/models/overlay";
import {NgGlobal} from "@ng/ng-global";

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
    rtl: NgGlobal.config.rtl,
    style: {width: '400px'}
  }

  constructor(private overlayService: OverlayService) {
  }

  showConfirmDialog() {
    this.overlayService.showConfirmDialog(this.confirmDialog)
  }
}
