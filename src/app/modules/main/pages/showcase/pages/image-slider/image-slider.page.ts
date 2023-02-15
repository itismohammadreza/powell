import {Component} from '@angular/core';
import {ImageItem} from '@ng/models/image-slider';

@Component({
  selector: 'ng-image-slider-page',
  templateUrl: './image-slider.page.html',
  styleUrls: ['./image-slider.page.scss']
})
export class ImageSliderPage {
  images: ImageItem[] = [
    {
      preview: 'https://via.placeholder.com/640x380?text=test1',
      thumbnail: 'https://via.placeholder.com/240x130?text=test1',
      alt: 'test1',
      caption: {
        title: 'test1',
        subtitle: 'test1',
      }
    },
    {
      preview: 'https://via.placeholder.com/640x380?text=test2',
      thumbnail: 'https://via.placeholder.com/240x130?text=test2',
      alt: 'test2',
      caption: {
        title: 'test2',
        subtitle: 'test2',
      }
    },
    {
      preview: 'https://via.placeholder.com/640x380?text=test3',
      thumbnail: 'https://via.placeholder.com/240x130?text=test3',
      alt: 'test3',
      caption: {
        title: 'test3',
        subtitle: 'test3',
      }
    },
    {
      preview: 'https://via.placeholder.com/640x380?text=test4',
      thumbnail: 'https://via.placeholder.com/240x130?text=test4',
      alt: 'test4',
      caption: {
        title: 'test4',
        subtitle: 'test4',
      }
    },
    {
      preview: 'https://via.placeholder.com/640x380?text=test5',
      thumbnail: 'https://via.placeholder.com/240x130?text=test5',
      alt: 'test5',
      caption: {
        title: 'test5',
        subtitle: 'test5',
      }
    },
    {
      preview: 'https://via.placeholder.com/640x380?text=test6',
      thumbnail: 'https://via.placeholder.com/240x130?text=test6',
      alt: 'test6',
      caption: {
        title: 'test6',
        subtitle: 'test6',
      }
    },
    {
      preview: 'https://via.placeholder.com/640x380?text=test7',
      thumbnail: 'https://via.placeholder.com/240x130?text=test7',
      alt: 'test7',
      caption: {
        title: 'test7',
        subtitle: 'test7',
      }
    }
  ];
  numVisible: number = 3;
  showItemNavigators: boolean = false;
  showThumbnailNavigators: boolean = true;
  showItemNavigatorsOnHover: boolean = false;
  changeItemOnIndicatorHover: boolean = false;
  circular: boolean = true;
  autoPlay: boolean = true;
  transitionInterval: number = 4000;
  showThumbnails: boolean = true;
  thumbnailsPosition: string = 'bottom';
  verticalThumbnailViewPortHeight: string = '300px';
  showIndicators: boolean = false;
  showIndicatorsOnItem: boolean = false;
  indicatorsPosition: string = 'bottom';

  visible: boolean = false;
  activeIndex: number = 0;

  onOpenSlider() {
    this.visible = true;
  }

  imageClick(index: number) {
    this.activeIndex = index;
    this.visible = true;
  }
}
