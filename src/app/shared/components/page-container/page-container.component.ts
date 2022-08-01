import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ng-page-container',
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.scss'],
})
export class PageContainerComponent implements OnInit {
  @Input() header: string;

  ngOnInit(): void {}
}
