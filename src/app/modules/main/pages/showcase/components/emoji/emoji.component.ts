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
    const emoji = this.document.querySelector<HTMLDivElement>('.wrapper');
    const eyes = this.document.querySelectorAll<HTMLDivElement>('.eye-color');
    const emojiClientLeft = emoji.getBoundingClientRect().left;
    const emojiClientTop = emoji.getBoundingClientRect().top;
    const windowObj = this.document.defaultView;
    const threshold = 100;
    windowObj.addEventListener('mousemove', (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      const closeFromLeft = Math.abs(mouseX - emojiClientLeft) < threshold;
      const closeFromTop = Math.abs(mouseY - emojiClientTop) < threshold;
      const closeFromRight = Math.abs(mouseX - (emojiClientLeft + emoji.offsetWidth)) < threshold;
      const closeFromBottom = Math.abs(mouseY - (emojiClientTop + emoji.offsetHeight)) < threshold;
      const closeFromLeftOrRight = closeFromLeft || closeFromRight;
      const closeFromTopOrBottom = closeFromTop || closeFromBottom;
      const isInVerticalBoundary = mouseY > emojiClientTop - threshold && mouseY < emojiClientTop + emoji.offsetHeight + threshold;
      const isInHorizontalBoundary = mouseX > emojiClientLeft - threshold && mouseX < emojiClientLeft + emoji.offsetWidth + threshold;
      if ((closeFromLeftOrRight && isInVerticalBoundary) || (closeFromTopOrBottom && isInHorizontalBoundary)) {
        emoji.classList.add('stressful');
      } else {
        emoji.classList.remove('stressful');
      }
      const eyeX = (mouseX / (windowObj.innerWidth * 2)) * 100;
      const eyeY = (mouseY / (windowObj.innerHeight * 2)) * 100;
      eyes.forEach((eye: HTMLDivElement) => {
        eye.style.left = `${eyeX}%`;
        eye.style.top = `${eyeY}%`;
      });
    });
  }

  onMouseOver(event: any) {
    event.currentTarget.classList.add('scary');
    event.currentTarget.classList.remove('stressful');
  }

  onMouseLeave(event: any) {
    event.currentTarget.classList.remove('scary');
  }
}
