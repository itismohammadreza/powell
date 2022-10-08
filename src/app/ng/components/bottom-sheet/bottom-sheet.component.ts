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
import {TemplateDirective} from "@ng/directives/template.directive";

@Component({
  selector: 'ng-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
})
export class BottomSheetComponent implements OnInit, AfterContentInit {
  @Input() title: string;
  @Input() visible: boolean;
  @Input() style: any;
  @Input() styleClass: string;
  @Input() appendTo: any = 'body';
  @Input() blockScroll: boolean = true;
  @Input() baseZIndex: number = 0;
  @Input() autoZIndex: boolean = true;
  @Input() modal: boolean = true;
  @Input() dismissible: boolean = true;
  @Input() showCloseIcon: boolean = true;
  @Input() transitionOptions: string = '270ms cubic-bezier(0, 0, 0.2, 1)';
  @Input() closeOnEscape: boolean = true;
  @Output() onShow = new EventEmitter();
  @Output() onHide = new EventEmitter();
  @Output() visibleChange = new EventEmitter();
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  titleTemplate: TemplateRef<any>;
  footerTemplate: TemplateRef<any>;

  ngOnInit() {
    this.style = {height: '50vh', ...this.style};
    this.styleClass = `p-bottom-sheet ${this.styleClass}`;
  }

  ngAfterContentInit() {
    this.templates.forEach((item: TemplateDirective) => {
      switch (item.getType()) {
        case 'title':
          this.titleTemplate = item.templateRef;
          break;

        case 'footer':
          this.footerTemplate = item.templateRef;
          break;
      }
    });
  }

  onVisibleChange(event: any) {
    this.visible = event;
    this.visibleChange.emit(this.visible);
  }

  emitter(name: string, event: any) {
    (this[name] as EventEmitter<any>).emit(event);
  }
}
