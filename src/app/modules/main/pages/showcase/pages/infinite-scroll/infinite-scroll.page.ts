import {Component} from '@angular/core';

@Component({
  selector: 'ng-infinite-scroll-page',
  templateUrl: './infinite-scroll.page.html',
  styleUrls: ['./infinite-scroll.page.scss']
})
export class InfiniteScrollPage {

  list: any[] = this.generateList();
  loading = false;

  onScroll() {
    this.loading = true;
    setTimeout(() => {
      this.list.push(...this.generateList())
      this.loading = false;
    }, 2000)
  }

  generateList() {
    const lastIndex = this.list?.length || 0;
    return Array.from(Array(50).keys(), (item, i) => `item-${lastIndex + i}`)
  }
}
