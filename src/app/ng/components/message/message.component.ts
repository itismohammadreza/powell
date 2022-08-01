import {Component, OnInit} from '@angular/core';
import {NgMessage, NgMessageOptions} from '@ng/models/overlay';

@Component({
  selector: 'ng-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  messages: NgMessage[] = [];
  options: NgMessageOptions = {
    closable: true,
    showTransitionOptions: '300ms ease-out',
    hideTransitionOptions: '200ms cubic-bezier(0.86, 0, 0.07, 1)',
  };
}
