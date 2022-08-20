import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList, TemplateRef
} from '@angular/core';
import {NgButtonAppearance} from '@ng/models/button';
import {NgColor} from '@ng/models/color';
import {NgPosition, NgSize} from '@ng/models/offset';
import {MenuItem} from 'primeng/api';
import {TemplateDirective} from "@ng/directives/template.directive";

@Component({
  selector: 'ng-split-button',
  templateUrl: './split-button.component.html',
  styleUrls: ['./split-button.component.scss'],
})
export class SplitButtonComponent implements AfterContentInit {
  @Input() label: string;
  @Input() items: MenuItem[];
  @Input() icon: string;
  @Input() iconPos: NgPosition = 'left';
  @Input() appendTo: any;
  @Input() appearance: NgButtonAppearance = 'outlined';
  @Input() disabled: boolean;
  @Input() rtl: boolean;
  @Input() rounded: boolean;
  @Input() raised: boolean;
  @Input() color: NgColor = 'primary';
  @Input() size: NgSize = 'md';
  @Input() style: string;
  @Input() styleClass: string;
  @Input() menuStyle: string;
  @Input() menuStyleClass: string;
  @Input() tabindex: number;
  @Input() showTransitionOptions: string = '225ms ease-out';
  @Input() hideTransitionOptions: string = '195ms ease-in';
  @Output() onClick = new EventEmitter();
  @Output() onDropdownClick = new EventEmitter();
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;
  contentTemplate: TemplateRef<any>;

  ngAfterContentInit() {
    this.templates.forEach((item: TemplateDirective) => {
      switch (item.getType()) {
        case 'content':
          this.contentTemplate = item.templateRef;
          break;
      }
    });
  }

  emitter(name: string, event: any) {
    (this[name] as EventEmitter<any>).emit(event);
  }
}
