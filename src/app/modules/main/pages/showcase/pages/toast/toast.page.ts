import {Component} from '@angular/core';
import {NgToastOptions} from "@ng/models/overlay";
import {OverlayService} from "@ng/services";

@Component({
  selector: 'ng-toast-page',
  templateUrl: './toast.page.html',
  styleUrls: ['./toast.page.scss']
})
export class ToastPage {
  constructor(private overlayService: OverlayService) {
  }

  toast: NgToastOptions = {
    life: 3000,
    sticky: false,
    rtl: false,
    summary: 'Some Summary',
    closable: false,
    severity: 'info',
    icon: 'pi pi-info',
    detail: 'Some Detail',
    preventDuplicates: false,
    position: 'top-right'
  }

  showToast() {
    this.overlayService.showToast(this.toast)
  }
}
