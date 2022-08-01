import {Component, Input, OnInit, Output} from '@angular/core';
import {NgPosition} from '@ng/models/offset';
import {BreakPointItem, ImageItem} from '@ng/models/image-slider';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'ng-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit {
  @Input() images: ImageItem[] = [];
  @Input() autoPlay: boolean = true;
  @Input() rtl: boolean = false;
  @Input() responsiveOptions: BreakPointItem[] = [{
    breakpoint: '1024px',
    numVisible: 3,
  }, {
    breakpoint: '560px',
    numVisible: 2,
  }];
  @Input() showIndicatorsOnItem: boolean = true;
  @Input() showIndicators: boolean = false;
  @Input() showThumbnails: boolean = true;
  @Input() showItemNavigators: boolean = false;
  @Input() showItemNavigatorsOnHover: boolean = false;
  @Input() changeItemOnIndicatorHover: boolean = false;
  @Input() showThumbnailNavigators: boolean = false;
  @Input() circular: boolean = true;
  @Input() indicatorsPosition: NgPosition = 'bottom';
  @Input() thumbnailsPosition: NgPosition = 'bottom';
  @Input() fullScreen: boolean = false;
  @Input() visible: boolean = false;
  @Input() numVisible: number = 3;
  @Input() activeIndex: number = 0;
  @Output() visibleChange = new EventEmitter();

  ngOnInit(): void {
  }

  onVisibleChane(event) {
    this.visible = event;
    this.visibleChange.emit(this.visible);
  }

}
