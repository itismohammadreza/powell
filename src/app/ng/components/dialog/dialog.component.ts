import {Component, EventEmitter} from '@angular/core';
import {NgDialogOptions} from '@ng/models/overlay';

@Component({
  selector: 'ng-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  onClose = new EventEmitter();
  options: NgDialogOptions = {};
  visible: boolean = true;

  show() {
    this.visible = true;
  }

  close() {
    this.visible = false;
    this.onClose.emit();
  }

  onButtonClick() {
    this.visible = false;
    this.onClose.emit(null);
  }
}
