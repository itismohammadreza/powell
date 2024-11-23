import {Component, OnInit} from '@angular/core';
import {LoadingContainerModule} from "@powell/components/loading-container";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";

@Component({
  selector: 'ng-loading-container-page',
  templateUrl: './loading-container.page.html',
  styleUrls: ['./loading-container.page.scss'],
  imports: [
    LoadingContainerModule,
    ExtrasModule,
  ]
})
export class LoadingContainerPage implements OnInit {
  list: any[];

  ngOnInit() {
    setTimeout(() => {
      this.list = [1, 2, 3, 4, 5]
    }, 3000)
  }
}
