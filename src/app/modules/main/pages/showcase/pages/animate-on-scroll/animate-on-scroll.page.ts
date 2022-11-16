import {Component} from '@angular/core';
import {ScrollService} from "@ng/services/scroll.service";

@Component({
  selector: 'ng-animate-on-scroll',
  templateUrl: './animate-on-scroll.page.html',
  styleUrls: ['./animate-on-scroll.page.scss']
})
export class AnimateOnScrollPage {
  constructor(private scrollService: ScrollService) {
  }

  ngOnInit() {
    this.scrollService.init({easing: 'ease-in-out-sine'})
  }
}
