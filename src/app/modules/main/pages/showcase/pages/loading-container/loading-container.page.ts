import {Component, OnInit} from '@angular/core';
import {LoadingContainerModule} from "@powell/components/loading-container";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {
  PreviewOptionsComponent
} from "@modules/main/pages/showcase/components/preview-options/preview-options.component";

@Component({
  selector: 'ng-loading-container-page',
  templateUrl: './loading-container.page.html',
  styleUrls: ['./loading-container.page.scss'],
  standalone: true,
  imports: [
    LoadingContainerModule,
    ExtrasModule,
    PreviewOptionsComponent
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
