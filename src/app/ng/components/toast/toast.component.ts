import {Component} from '@angular/core';
import {NgToastOptions} from '@ng/models/overlay';

@Component({
  selector: 'ng-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {

  options: NgToastOptions = {
    rtl: true,
    baseZIndex: 1000,
    autoZIndex: true,
    showTransitionOptions: '300ms ease-out',
    hideTransitionOptions: '250ms ease-in',
    showTransformOptions: 'translateY(100%)',
    hideTransformOptions: 'translateY(-100%)',
  };
}
