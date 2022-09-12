import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'ng-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
})
export class BottomSheetComponent {
  @Input() visible: boolean;
  @Input() style: any = {height: '50vh'};
  @Input() styleClass: string;
  @Input() blockScroll: boolean = true;
  @Input() baseZIndex: number = 0;
  @Input() autoZIndex: boolean = true;
  @Input() modal: boolean = true;
  @Input() dismissible: boolean = true;
  @Input() showCloseIcon: boolean = true;
  @Input() transitionOptions: string = '500ms cubic-bezier(0, 0, 0.2, 1)';
  @Input() closeOnEscape: boolean = true;
  @Output() visibleChange = new EventEmitter<boolean>();

  onVisibleChange(event: any) {
    this.visible = event;
    this.visibleChange.emit(this.visible);
  }
}
