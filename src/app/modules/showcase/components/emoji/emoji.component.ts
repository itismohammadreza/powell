import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ng-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.scss']
})
export class EmojiComponent implements OnInit {

  ngOnInit() {
    const eyes = document.querySelectorAll('.eye-color');
    window.addEventListener('mousemove', (event) => {
      const x = (event.clientX / (window.innerWidth * 2)) * 100;
      const y = (event.clientY / (window.innerHeight * 2)) * 100;
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
