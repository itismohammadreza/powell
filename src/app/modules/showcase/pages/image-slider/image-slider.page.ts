import {Component, OnInit} from '@angular/core';
import {ImageItem} from '@ng/models/image-slider';

@Component({
  selector: 'ng-image-slider-page',
  templateUrl: './image-slider.page.html',
  styleUrls: ['./image-slider.page.scss']
})
export class ImageSliderPage implements OnInit {
  visible: boolean = false;
  activeIndex: number = 0;
  images: ImageItem[] = [
    {
      preview: 'https://via.placeholder.com/640x380?text=test1',
      alt: 'test1',
      caption: {
        title: 'test1',
        subtitle: 'test1',
      }
    },
    {
      preview: 'https://via.placeholder.com/640x380?text=test2',
      alt: 'test2',
      caption: {
        title: 'test2',
        subtitle: 'test2',
      }
    },
    {
      preview: 'https://via.placeholder.com/640x380?text=test3',
      alt: 'test3',
      caption: {
        title: 'test3',
        subtitle: 'test3',
      }
    },
    {
      preview: 'https://via.placeholder.com/640x380?text=test4',
      alt: 'test4',
      caption: {
        title: 'test4',
        subtitle: 'test4',
      }
    },
    {
      preview: 'https://via.placeholder.com/640x380?text=test5',
      alt: 'test5',
      caption: {
        title: 'test5',
        subtitle: 'test5',
      }
    },
    {
      preview: 'https://via.placeholder.com/640x380?text=test6',
      alt: 'test6',
      caption: {
        title: 'test6',
        subtitle: 'test6',
      }
    },
    {
      preview: 'https://via.placeholder.com/640x380?text=test7',
      alt: 'test7',
      caption: {
        title: 'test7',
        subtitle: 'test7',
      }
    }
  ];

  ngOnInit(): void {
  }

  onOpenSlider() {
    this.visible = true;
  }

  imageClick(index: number) {
    this.activeIndex = index;
    this.visible = true;
  }


}
