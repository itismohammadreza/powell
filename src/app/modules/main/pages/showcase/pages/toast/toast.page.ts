import {Component, inject} from '@angular/core';
import {NgToastOptions} from "@powell/models";
import {ConfigService, OverlayService} from "@powell/api";

@Component({
  selector: 'ng-toast-page',
  templateUrl: './toast.page.html',
  styleUrls: ['./toast.page.scss']
})
export class ToastPage {
  private configService = inject(ConfigService);
  private overlayService = inject(OverlayService);

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

  showToast() {
    this.overlayService.showToast(this.toast)
  }
}
