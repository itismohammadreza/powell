import {Component, EventEmitter} from '@angular/core';
import {NgDialogOptions} from '@powell/models';

@Component({
  selector: 'ng-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
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
  }

  onButtonClick() {
    this.close();
    this.onClose.emit();
  }

  onHide() {
    this.onClose.emit();
    this.handleEvent('onHide');
  }

  handleEvent(event: string, args?: any) {
    this.options[event]?.(args);
  }
}
