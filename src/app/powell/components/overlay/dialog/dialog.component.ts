import {Component, EventEmitter, ViewChild} from '@angular/core';
import {NgDialogOptions} from '@powell/models';
import {$Dialog} from "@powell/primeng";

@Component({
  selector: 'ng-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  standalone: false
})
export class DialogComponent {
  onClose = new EventEmitter();
  options: NgDialogOptions = {};
  visible: boolean = true;
  @ViewChild($Dialog, {static: true}) dialog: $Dialog;

  show() {
    for (const key in this.options) {
      const option = this.options[key];
      if (typeof option !== 'function') {
        this.dialog[key] = this.options[key];
      }
    }
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
