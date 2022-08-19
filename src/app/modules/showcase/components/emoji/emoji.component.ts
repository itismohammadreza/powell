import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'ng-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.scss']
})
export class EmojiComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit() {
    const emoji: HTMLDivElement = this.document.querySelector('.wrapper');
    const eyes = this.document.querySelectorAll<HTMLDivElement>('.eye-color');
    const windowObj = this.document.defaultView;
    const threshold = 100;
    windowObj.addEventListener('mousemove', (event) => {
      const closeFromLeft = Math.abs(event.clientX - emoji.getBoundingClientRect().left) < threshold;
      const closeFromTop = Math.abs(event.clientY - emoji.getBoundingClientRect().top) < threshold;
      const closeFromRight = Math.abs(event.clientX - (emoji.getBoundingClientRect().left + emoji.offsetWidth)) < threshold;
      const closeFromBottom = Math.abs(event.clientY - (emoji.getBoundingClientRect().top + emoji.offsetHeight)) < threshold;
      const isInVerticalBoundary = event.clientY > emoji.getBoundingClientRect().top - threshold && event.clientY < emoji.getBoundingClientRect().top + emoji.offsetHeight + threshold
      const isInHorizontalBoundary = event.clientX > emoji.getBoundingClientRect().left - threshold && event.clientX < emoji.getBoundingClientRect().left + emoji.offsetWidth + threshold
      if (((closeFromLeft || closeFromRight) && isInVerticalBoundary) || ((closeFromTop || closeFromBottom) && isInHorizontalBoundary)) {
        emoji.classList.add('stressful');
      } else {
        emoji.classList.remove('stressful');
      }
      const x = (event.clientX / (windowObj.innerWidth * 2)) * 100;
      const y = (event.clientY / (windowObj.innerHeight * 2)) * 100;
      eyes.forEach((e: any) => {
        e.style.left = `${x}%`;
        e.style.top = `${y}%`;
      });
    });
  }

  onMouseOver(event) {
    event.currentTarget.classList.add('scary');
    event.currentTarget.classList.remove('stressful');
  }

  onMouseLeave(event) {
    event.currentTarget.classList.remove('scary');
  }
}
