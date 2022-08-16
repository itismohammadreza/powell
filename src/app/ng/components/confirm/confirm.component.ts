import {Component} from '@angular/core';
import {NgConfirmOptions} from '@ng/models/overlay';

@Component({
  selector: 'ng-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent{
  options: NgConfirmOptions = {
    rtl: false,
    closable: true,
    dismissableMask: false,
    position: 'center',
    style: {width: '400px'},
    acceptVisible: true,
    acceptLabel: 'Yes',
    rejectVisible: true,
    rejectLabel: 'No',
    rejectAppearance: 'outlined',
    rejectColor: 'danger',
    baseZIndex: 1000,
    autoZIndex: true,
    breakpoints: {'960px': '75vw', '640px': '100vw'},
    transitionOptions: '400ms cubic-bezier(0.25, 0.8, 0.25, 1)',
  };
}
