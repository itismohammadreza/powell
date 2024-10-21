import {Component, inject} from '@angular/core';
import {NgConfirmPopupOptions} from "@powell/models";
import {ConfigService, OverlayService} from "@powell/api";
import {ButtonModule} from "@powell/components/button";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {
  PreviewOptionsComponent
} from "@modules/main/pages/showcase/components/preview-options/preview-options.component";

@Component({
  selector: 'ng-confirm-popup-page',
  templateUrl: './confirm-popup.page.html',
  styleUrls: ['./confirm-popup.page.scss'],
  standalone: true,
  imports: [
    ButtonModule,
    ExtrasModule,
    PreviewOptionsComponent
  ]
})
export class ConfirmPopupPage {
  private configService = inject(ConfigService);
  private overlayService = inject(OverlayService);

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
    rtl: this.configService.get().rtl
  }

  showConfirmPopup(event) {
    this.overlayService.showConfirmPopup({...this.confirmPopup, target: event.target})
  }
}
