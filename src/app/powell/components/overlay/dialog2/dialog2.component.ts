import {ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'ng-dialog2',
  templateUrl: './dialog2.component.html',
  styleUrls: ['./dialog2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dialog2Component implements OnInit, OnDestroy {
  constructor(private element: ElementRef, @Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit() {
    this.document.body.appendChild(this.element.nativeElement);
    this.element.nativeElement.addEventListener('click', el => {
      if (el.target.className === 'jw-modal') {
        this.close();
      }
    });
  }

  ngOnDestroy() {
    this.element.nativeElement.remove();
  }

  open() {
    this.element.nativeElement.style.display = 'block';
    this.document.body.classList.add('jw-modal-open');
    this.document.body.style.overflow = 'hidden';
  }

  close() {
    this.element.nativeElement.style.display = 'none';
    this.document.body.classList.remove('jw-modal-open');
    this.document.body.style.overflow = null;
  }
}
