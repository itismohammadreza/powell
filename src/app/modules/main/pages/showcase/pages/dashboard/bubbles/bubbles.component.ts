import {Component} from '@angular/core';

@Component({
  selector: 'ng-bubbles',
  templateUrl: './bubbles.component.html',
  styleUrls: ['./bubbles.component.scss']
})
export class BubblesComponent {
  bubbleNumbers = new Array(100);
}
