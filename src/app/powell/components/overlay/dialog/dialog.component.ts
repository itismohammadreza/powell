import {ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, ViewChild} from '@angular/core';
import {DialogOptions} from '@powell/models';
import {$Dialog, $DialogModule} from "@powell/primeng";
import {ButtonModule} from '@powell/components/button';
import {SafeModule} from '@powell/pipes/safe';

@Component({
  selector: 'pw-dialog',
  templateUrl: './dialog.component.html',
  imports: [
    $DialogModule,
    ButtonModule,
    SafeModule
  ]
})
export class DialogComponent {
  private el = inject(ElementRef);
  private cd = inject(ChangeDetectorRef);

  onClose = new EventEmitter();
  options: DialogOptions = {};
  visible: boolean = true;
  @ViewChild($Dialog, {static: true}) dialog!: $Dialog;

  show() {
    const footerEl = this.el.nativeElement.querySelector('.p-dialog-footer');
    if (footerEl) {
      const allChildrenAreComment = [...footerEl.childNodes].every(node => node.nodeType === Node.COMMENT_NODE);
      if (allChildrenAreComment) {
        footerEl.style.display = 'none';
      }
    }
    for (const k in this.options) {
      const key = k as keyof DialogOptions & keyof $Dialog;
      const option = this.options[key];
      if (typeof option !== 'function') {
        // @ts-ignore
        this.dialog[key] = option;
      }
    }
    this.visible = true;
  }

  close() {
    this.visible = false;
    this.cd.detectChanges();
  }

  onButtonClick() {
    this.close();
    this.onClose.emit();
  }

  onHide() {
    this.onClose.emit();
    this.handleEvent('onHide');
  }

  handleEvent(event: keyof DialogOptions, args?: SafeAny) {
    this.options[event]?.(args);
  }
}
