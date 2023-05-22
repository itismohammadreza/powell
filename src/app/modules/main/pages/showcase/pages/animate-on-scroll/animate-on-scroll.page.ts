import {Component, OnInit} from '@angular/core';
import {AnimateOnScrollService} from "@powell/api";

@Component({
  selector: 'ng-animate-on-scroll',
  templateUrl: './animate-on-scroll.page.html',
  styleUrls: ['./animate-on-scroll.page.scss']
})
export class AnimateOnScrollPage implements OnInit {
  constructor(private scrollService: AnimateOnScrollService) {
  }

  ngOnInit() {
    this.scrollService.init({easing: 'ease-in-out-sine'})
  }
}
