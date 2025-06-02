import {Component, ComponentRef, inject, OnDestroy, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {Subject} from 'rxjs';
import {DynamicDialogRef} from './dynamic-dialog-ref';

@Component({
  selector: 'pw-dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html',
  styles: `
    .overlay {
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.7);
      align-items: center;
      justify-content: center;
      z-index: 25000;
    }

    .dialog {
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
      background-color: white;
      width: 50%;
      height: 50%;
      display: flex;
      flex-direction: column;
      padding: 8px;
    }
  `,
  standalone: false
})
export class DynamicDialogComponent implements OnDestroy {
  private dialogRef = inject(DynamicDialogRef);
  private _onClose = new Subject<any>();

  componentRef: ComponentRef<any>;
  onClose = this._onClose.asObservable();

  @ViewChild('insertion', {read: ViewContainerRef, static: true}) insertionPoint: ViewContainerRef;

  open(childComponent: Type<any>) {
    this.insertionPoint.clear();
    this.componentRef = this.insertionPoint.createComponent(childComponent);
  }

  onOverlayClicked(evt: MouseEvent) {
    this.dialogRef.close();
  }

  onDialogClicked(evt: MouseEvent) {
    evt.stopPropagation();
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  close() {
    this._onClose.next(null);
  }
}
