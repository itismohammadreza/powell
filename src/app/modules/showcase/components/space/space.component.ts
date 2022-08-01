import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ng-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss']
})
export class SpaceComponent implements OnInit {

  dotNumbers = new Array(200);

  ngOnInit(): void {
  }

}
