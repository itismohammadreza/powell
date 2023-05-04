import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef
} from '@angular/core';
import {TemplateDirective} from "@ng/directives/template";
import {NgSeverity} from "@ng/models";
import {ConfigHandler} from "@ng/api";

@Component({
  selector: 'ng-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent extends ConfigHandler implements AfterContentInit {
  @Input() inlineMessage: string;
  @Input() summary: string;
  @Input() detail: string;
  @Input() icon: string;
  @Input() severity: NgSeverity;
  @Input() closable: boolean;
  @Input() rtl: boolean;
  @Input() disableConfigChangeEffect: boolean;
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
    })
  }
}
