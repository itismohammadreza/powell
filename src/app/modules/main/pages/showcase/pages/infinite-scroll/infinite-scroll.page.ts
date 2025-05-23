import {Component, OnInit} from '@angular/core';
import {InfiniteScrollModule} from "@powell/components/infinite-scroll";
import {PreviewComponent} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-infinite-scroll-page',
  templateUrl: './infinite-scroll.page.html',
  imports: [
    InfiniteScrollModule,
    PreviewComponent
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
