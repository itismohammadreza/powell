import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ng-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss']
})
export class BlocksComponent implements OnInit {

  bubblesNumber = new Array(10);

  ngOnInit(): void {
  }

}
