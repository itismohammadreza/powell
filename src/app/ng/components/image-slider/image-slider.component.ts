import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef
} from '@angular/core';
import {NgBreakPointItem, NgImageItem} from '@ng/models';
import {TemplateDirective} from "@ng/directives/template";

@Component({
  selector: 'ng-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit, AfterContentInit {
  @Input() images: NgImageItem[] = [];
  @Input() activeIndex: number = 0;
  @Input() fullScreen: boolean;
  @Input() visible: boolean;
  @Input() numVisible: number = 3;
  @Input() responsiveOptions: NgBreakPointItem[] = [{
    breakpoint: '1024px',
    numVisible: 3,
  }, {
    breakpoint: '560px',
    numVisible: 2,
  }];
  @Input() showItemNavigators: boolean;
  @Input() showThumbnailNavigators: boolean = true;
  @Input() showItemNavigatorsOnHover: boolean;
  @Input() changeItemOnIndicatorHover: boolean;
  @Input() circular: boolean;
  @Input() autoPlay: boolean = true;
  @Input() transitionInterval: number = 4000;
  @Input() showThumbnails: boolean = true;
  @Input() thumbnailsPosition: string = 'bottom';
  @Input() verticalThumbnailViewPortHeight: string = '300px';
  @Input() showIndicators: boolean;
  @Input() showIndicatorsOnItem: boolean;
  @Input() indicatorsPosition: string = 'bottom';
  @Input() baseZIndex: number = 0;
  @Input() maskClass: string;
  @Input() containerStyle: string;
  @Input() showTransitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';
  @Input() hideTransitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';
  @Output() visibleChange = new EventEmitter();
  @Output() activeIndexChange = new EventEmitter();
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  headerTemplate: TemplateRef<any>;
  thumbnailTemplate: TemplateRef<any>;
  itemTemplate: TemplateRef<any>;
  indicatorTemplate: TemplateRef<any>;
  captionTemplate: TemplateRef<any>;
  footerTemplate: TemplateRef<any>;

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    this.templates.forEach((item: TemplateDirective) => {
      switch (item.getType()) {
        case 'header':
          this.headerTemplate = item.templateRef;
          break;

        case 'thumbnail':
          this.thumbnailTemplate = item.templateRef;
          break;

        case 'item':
          this.itemTemplate = item.templateRef;
          break;

        case 'indicator':
          this.indicatorTemplate = item.templateRef;
          break;

        case 'caption':
          this.captionTemplate = item.templateRef;
          break;

        case 'footer':
          this.footerTemplate = item.templateRef;
          break;
      }
    })
  }

  onVisibleChange(event) {
    this.visible = event;
    this.visibleChange.emit(this.visible);
  }

  onActiveIndexChange(event: any) {
    this.activeIndex = event;
    this.activeIndexChange.emit(this.visible);
  }
}
