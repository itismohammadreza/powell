import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  OnDestroy,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Subject} from 'rxjs';
import {DynamicDialogRef} from './dynamic-dialog-ref';

@Component({
  selector: 'ng-dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html',
  styleUrls: ['./dynamic-dialog.component.scss']
})
export class DynamicDialogComponent implements AfterViewInit, OnDestroy {
  componentRef: ComponentRef<any>;

  @ViewChild('insertion', {read: ViewContainerRef})
  insertionPoint: ViewContainerRef;

  private readonly _onClose = new Subject<any>();
  public onClose = this._onClose.asObservable();

  childComponentType: Type<any>;

  constructor(private cd: ChangeDetectorRef, private dialogRef: DynamicDialogRef) {
  }

  ngAfterViewInit() {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }

  onOverlayClicked(evt: MouseEvent) {
    this.dialogRef.close();
  }

  onDialogClicked(evt: MouseEvent) {
    evt.stopPropagation();
  }

  loadChildComponent(componentType: Type<any>) {
    this.insertionPoint.clear();
    this.componentRef = this.insertionPoint.createComponent(componentType);
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
