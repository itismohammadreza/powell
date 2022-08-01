import {Component} from '@angular/core';
import {NgConfirmPopupOptions} from '@ng/models/overlay';

@Component({
  selector: 'ng-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss'],
})
export class ConfirmPopupComponent {
  options: NgConfirmPopupOptions = {
    autoZIndex: true,
    baseZIndex: 1000,
    showTransitionOptions: '.12s cubic-bezier(0, 0, 0.2, 1)',
    hideTransitionOptions: '.1s linear'
  };
}
