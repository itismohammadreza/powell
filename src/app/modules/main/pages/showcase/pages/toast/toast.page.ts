import {Component} from '@angular/core';
import {NgToastOptions} from "@powell/models";
import {ConfigService, OverlayService} from "@powell/api";

@Component({
  selector: 'ng-toast-page',
  templateUrl: './toast.page.html',
  styleUrls: ['./toast.page.scss']
})
export class ToastPage {
  toast: NgToastOptions = {
    life: 3000,
    sticky: false,
    rtl: this.configService.getConfig().rtl,
    summary: 'Some Summary',
    closable: false,
    severity: 'info',
    icon: 'pi pi-info',
    detail: 'Some Detail',
    preventDuplicates: false,
    position: 'top-right'
  }

  constructor(private overlayService: OverlayService, private configService: ConfigService) {
  }

  showToast() {
    this.overlayService.showToast(this.toast)
  }
}
