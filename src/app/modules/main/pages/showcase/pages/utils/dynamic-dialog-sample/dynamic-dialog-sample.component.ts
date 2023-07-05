import {Component} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from '@powell/components/overlay';

@Component({
  selector: 'ng-dynamic-dialog-sample',
  templateUrl: './dynamic-dialog-sample.component.html',
  styleUrls: ['./dynamic-dialog-sample.component.scss']
})
export class DynamicDialogSampleComponent {
  constructor(public config: DynamicDialogConfig, public dialog: DynamicDialogRef) {
  }

  onClose() {
    this.dialog.close('some value');
  }
}
