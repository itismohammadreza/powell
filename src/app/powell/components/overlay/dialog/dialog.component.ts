import {Component, ElementRef, EventEmitter, inject, ViewChild} from '@angular/core';
import {DialogOptions} from '@powell/models';
import {$Dialog} from "@powell/primeng";

@Component({
  selector: 'pw-dialog',
  templateUrl: './dialog.component.html',
  standalone: false
})
export class DialogComponent {
  private el = inject(ElementRef);
  onClose = new EventEmitter();
  options: DialogOptions = {};
  visible: boolean = true;
  @ViewChild($Dialog, {static: true}) dialog: $Dialog;

  show() {
    const footerEl = this.el.nativeElement.querySelector('.p-dialog-footer');
    if (footerEl) {
      const allChildrenAreComment = [...footerEl.childNodes].every(node => node.nodeType === Node.COMMENT_NODE);
      if (allChildrenAreComment) {
        footerEl.style.display = 'none';
      }
    }
    for (const key in this.options) {
      const option = this.options[key];
      if (typeof option !== 'function') {
        this.dialog[key] = option;
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
