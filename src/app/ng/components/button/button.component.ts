import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef
} from '@angular/core';
import {NgIconPosition, NgSize} from '@ng/models/offset';
import {NgColor} from '@ng/models/color';
import {NgButtonAppearance, NgButtonType} from '@ng/models/button';
import {TemplateDirective} from '@ng/directives/template.directive';

@Component({
  selector: 'ng-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  host: {'[class.full]': 'full'}
})
export class ButtonComponent implements AfterContentInit {
  @Input() appearance: NgButtonAppearance;
  @Input() rounded: boolean;
  @Input() raised: boolean;
  @Input() color: NgColor = 'primary';
  @Input() full: boolean;
  @Input() badgeColor: NgColor = 'primary';
  @Input() size: NgSize = 'md';
  // native properties
  @Input() type: NgButtonType = 'button';
  @Input() label: string;
  @Input() icon: string;
  @Input() iconPos: NgIconPosition = 'left';
  @Input() badge: string;
  @Input() badgeClass: string;
  @Input() loading: boolean;
  @Input() loadingIcon: string = 'pi pi-spinner pi-spin';
  @Input() disabled: boolean;
  @Input() style: any;
  @Input() styleClass: any;
  @Output() onClick = new EventEmitter();
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

  _onClick(event: any) {
    this.onClick.emit(event);
  }
}
