import {Component, OnInit} from '@angular/core';

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

  visible = false;

  showBottomSheet() {
    this.visible = true;
  }
}
