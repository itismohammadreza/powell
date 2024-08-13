import {Component, inject} from '@angular/core';
import {OverlayService} from "@powell/api";

@Component({
  selector: 'ng-bottom-sheet-page',
  templateUrl: './bottom-sheet.page.html',
  styleUrls: ['./bottom-sheet.page.scss']
})
export class BottomSheetPage {
  private overlayService = inject(OverlayService);

  blockScroll: boolean = false;
  modal: boolean = true;
  dismissible: boolean = true;
  showCloseIcon: boolean = true;
  closeOnEscape: boolean = true;
  header: string = 'BottomSheet Header';

  visible = false;
  visible2 = false;
  visible3 = false;
  visible4 = false;

  async openDialog() {
    await this.overlayService.showConfirmDialog({message: 'asdsad'})
    this.visible4 = true
  }
}
