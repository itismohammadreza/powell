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
    const eyes = this.document.querySelectorAll('.eye-color');
    const windowObj = this.document.defaultView;
    windowObj.addEventListener('mousemove', (event) => {
      const x = (event.clientX / (windowObj.innerWidth * 2)) * 100;
      const y = (event.clientY / (windowObj.innerHeight * 2)) * 100;
      eyes.forEach((e: any) => {
        e.style.left = `${x}%`;
        e.style.top = `${y}%`;
      });
    });
  }

  onMouseOver(event) {
    event.target.classList.add('hover');
  }

  onMouseLeave(event) {
    event.target.classList.remove('hover');
  }
}
