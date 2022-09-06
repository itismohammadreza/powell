import {Component, EventEmitter, Inject, Input, OnChanges, Output, Renderer2, SimpleChanges} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'ng-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
  animations: [
    trigger('slideUpToggle', [
      transition(':enter', [
        style({transform: 'translateY(100%)'}),
        animate('200ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateY(100%)'}))
      ])
    ])
  ]
})
export class BottomSheetComponent implements OnChanges {
  @Input() visible: boolean;
  @Output() visibleChange = new EventEmitter<boolean>();

  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.visible = changes.visible.currentValue;
    this.visibleChange.emit(this.visible);
    if (this.visible) {
      // todo: fix add class to body
      // this.document.body.style.overflow = 'hidden';
      this.renderer.addClass(this.document.body, 'p-overflow-hidden')
    } else {
      //   this.document.body.style.overflow = null;
      this.renderer.removeClass(this.document.body, 'p-overflow-hidden')
    }
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
