import {AfterContentInit, Component, ContentChildren, Input, QueryList, TemplateRef} from '@angular/core';
import {TemplateDirective} from "@powell/directives/template";
import {NgSeverity} from "@powell/models";
import {ConfigHandler} from "@powell/api";

@Component({
  selector: 'ng-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements AfterContentInit {
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
