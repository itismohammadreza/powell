import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ng-bubbles',
  templateUrl: './bubbles.component.html',
  styleUrls: ['./bubbles.component.scss']
})
export class BubblesComponent implements OnInit {

  bubbleNumbers = new Array(100);

  ngOnInit(): void {
  }

}
