import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ng-bottom-sheet-page',
  templateUrl: './bottom-sheet.page.html',
  styleUrls: ['./bottom-sheet.page.scss']
})
export class BottomSheetPage implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  visible = false;

  showBottomSheet() {
    this.visible = true
  }

}
