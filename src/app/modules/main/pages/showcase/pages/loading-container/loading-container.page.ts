import {Component, OnInit} from '@angular/core';
import {LoadingContainerModule} from "@powell/components/loading-container";
import {PreviewComponent} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-loading-container-page',
  templateUrl: './loading-container.page.html',
  imports: [
    LoadingContainerModule,
    PreviewComponent
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
