import {Component, OnInit} from '@angular/core';
import {SuspenseModule} from "@powell/components/suspense";
import {PreviewComponent} from "@modules/main/pages/showcase/components";
import {Observable, of} from "rxjs";

@Component({
  selector: 'ng-suspense-page',
  templateUrl: './suspense.page.html',
  imports: [
    SuspenseModule,
    PreviewComponent
  ]
})
export class SuspensePage implements OnInit {
  list: Observable<any[]>;

  ngOnInit() {
    setTimeout(() => {
      this.list = of([1, 2, 3, 4, 5])
      // this.list = throwError('Not implemented');
    }, 3000)
  }
}
