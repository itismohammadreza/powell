import {Component, OnInit} from '@angular/core';
import {SuspenseModule} from "@powell/components/suspense";
import {PreviewComponent} from "@modules/main/pages/showcase/components";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-suspense-page',
  templateUrl: './suspense.page.html',
  imports: [
    SuspenseModule,
    PreviewComponent
  ]
})
export class SuspensePage implements OnInit {
  list: Observable<SafeAny[]>;

  ngOnInit() {
    setTimeout(() => {
      this.list = of([1, 2, 3, 4, 5])
    }, 3000)
  }
}
