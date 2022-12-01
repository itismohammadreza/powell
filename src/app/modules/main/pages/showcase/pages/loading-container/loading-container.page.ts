import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ng-loading-container-page',
  templateUrl: './loading-container.page.html',
  styleUrls: ['./loading-container.page.scss']
})
export class LoadingContainerPage implements OnInit {
  list: any[];

  ngOnInit() {
    setTimeout(() => {
      this.list = [1, 2, 3, 4, 5]
    }, 3000)
  }
}
