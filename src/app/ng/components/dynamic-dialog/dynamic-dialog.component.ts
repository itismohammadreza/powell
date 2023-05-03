import {ChangeDetectorRef, Component, ComponentRef, OnDestroy, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {Subject} from 'rxjs';
import {DynamicDialogRef} from './dynamic-dialog-ref';

@Component({
  selector: 'ng-dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html',
  styleUrls: ['./dynamic-dialog.component.scss']
})
export class DynamicDialogComponent implements OnDestroy {
  componentRef: ComponentRef<any>;
  private _onClose = new Subject<any>();
  onClose = this._onClose.asObservable();
  @ViewChild('insertion', {read: ViewContainerRef, static: true}) insertionPoint: ViewContainerRef;

  constructor(private cd: ChangeDetectorRef, private dialogRef: DynamicDialogRef) {
  }

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
