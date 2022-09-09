import {Component} from '@angular/core';
import {NgDialogOptions} from '@ng/models/overlay';
import {Subject} from 'rxjs';

@Component({
  selector: 'ng-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  onHide = new Subject();
  options: NgDialogOptions = {};
  visible: boolean = true;

  onButtonClick() {
    this.visible = false;
    this.onHide.next(null);
  }
}
