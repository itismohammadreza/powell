import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'ng-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @Input() onErrorImagePlaceholder: string;
  // native properties
  @Input() imageClass: string;
  @Input() imageStyle: any;
  @Input() styleClass: string;
  @Input() style: any;
  @Input() src: string;
  @Input() alt: string;
  @Input() width: string;
  @Input() height: string;
  @Input() appendTo: any;
  @Input() preview: boolean = false;
  @Input() showTransitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';
  @Input() hideTransitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';
  @Output() onShow = new EventEmitter();
  @Output() onHide = new EventEmitter();
  @Output() onError = new EventEmitter();

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.el.nativeElement.querySelector('img').onerror = (event) => {
      event.target.onerror = null;
      event.target.src = "assets/images/no-image-placeholder.jpg" || this.onErrorImagePlaceholder;
      this.onError.emit(event);
    }
  }

  emitter(name: string, event: any) {
    (this[name] as EventEmitter<any>).emit(event);
  }
}
