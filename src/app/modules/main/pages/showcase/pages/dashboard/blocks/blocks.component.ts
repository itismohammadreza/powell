import {Component} from '@angular/core';

@Component({
  selector: 'ng-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss'],
  standalone: true
})
export class BlocksComponent {
  bubblesNumber = new Array(10);
}
