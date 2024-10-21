import {Component} from '@angular/core';

@Component({
  selector: 'ng-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss'],
  standalone: true
})
export class SpaceComponent {
  dotNumbers = new Array(200);
}
