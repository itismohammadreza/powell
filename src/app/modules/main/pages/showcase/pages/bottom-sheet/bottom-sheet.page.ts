import {Component} from '@angular/core';
import {OverlayService} from "@powell/api";

@Component({
  selector: 'ng-bottom-sheet-page',
  templateUrl: './bottom-sheet.page.html',
  styleUrls: ['./bottom-sheet.page.scss']
})
export class BottomSheetPage {
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

  constructor(private overlayService: OverlayService) {
  }

  async openDialog() {
    // await this.overlayService.showDialog({content: 'asdsad'})
    await this.overlayService.showConfirmDialog({message: 'asdsad'})
    this.visible4 = true
  }
}
