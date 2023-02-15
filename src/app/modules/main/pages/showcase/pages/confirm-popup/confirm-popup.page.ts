import {Component, Inject} from '@angular/core';
import {NgConfirmPopupOptions} from "@ng/models/overlay";
import {OverlayService} from "@ng/services";
import {NgConfig} from "@ng/models/config";

@Component({
  selector: 'ng-confirm-popup-page',
  templateUrl: './confirm-popup.page.html',
  styleUrls: ['./confirm-popup.page.scss']
})
export class ConfirmPopupPage {
  confirmPopup: NgConfirmPopupOptions = {
    message: 'Are you sure?',
    icon: 'pi pi-exclamation-triangle',
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
    buttonFull: false,
    defaultFocus: 'accept',
    rtl: this.ngConfig.rtl
  }

  constructor(private overlayService: OverlayService, @Inject('NG_CONFIG') private ngConfig: NgConfig) {
  }

  showConfirmPopup(event) {
    this.overlayService.showConfirmPopup({...this.confirmPopup, target: event.target})
  }
}
