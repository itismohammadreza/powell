import {Component, OnInit} from '@angular/core';
import {InfiniteScrollModule} from "@powell/components/infinite-scroll";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {
  PreviewOptionsComponent
} from "@modules/main/pages/showcase/components/preview-options/preview-options.component";

@Component({
  selector: 'ng-infinite-scroll-page',
  templateUrl: './infinite-scroll.page.html',
  styleUrls: ['./infinite-scroll.page.scss'],
  standalone: true,
  imports: [
    InfiniteScrollModule,
    ExtrasModule,
    PreviewOptionsComponent
  ]
})
export class InfiniteScrollPage implements OnInit {
  list: any[] = []

  ngOnInit() {
    this.initListLazy()
  }

  initListLazy() {
    setTimeout(() => {
      this.list.push(...this.generateList())
    }, 2000)
  }

  onScroll(callback: Function) {
    setTimeout(() => {
      this.list.push(...this.generateList())
      callback()
    }, 2000)
  }

  generateList() {
    return Array.from(Array(20).keys(), () => 'item')
  }
}
