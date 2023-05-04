import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef
} from '@angular/core';
import {NgButtonAppearance, NgColor, NgIconPosition, NgSize} from '@ng/models';
import {TemplateDirective} from "@ng/directives/template";
import {PrimeMenuItem} from "@ng/primeng/api";
import {ConfigHandler} from "@ng/api";

@Component({
  selector: 'ng-split-button',
  templateUrl: './split-button.component.html',
  styleUrls: ['./split-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitButtonComponent extends ConfigHandler implements AfterContentInit {
  @Input() items: PrimeMenuItem[];
  @Input() appearance: NgButtonAppearance = 'outlined';
  @Input() rounded: boolean;
  @Input() raised: boolean;
  @Input() color: NgColor = 'primary';
  @Input() full: boolean;
  @Input() size: NgSize = 'md';
  @Input() rtl: boolean;
  @Input() disableConfigChangeEffect: boolean;
  // native properties
  @Input() label: string;
  @Input() icon: string;
  @Input() iconPos: NgIconPosition;
  @Input() style: string;
  @Input() styleClass: string;
  @Input() menuStyle: string;
  @Input() menuStyleClass: string;
  @Input() appendTo: any;
  @Input() disabled: boolean;
  @Input() tabindex: number;
  @Input() showTransitionOptions: string = '225ms ease-out';
  @Input() hideTransitionOptions: string = '195ms ease-in';
  @Output() onClick = new EventEmitter();
  @Output() onDropdownClick = new EventEmitter();
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;
  contentTemplate: TemplateRef<any>;

  constructor() {
    super();
  }

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
