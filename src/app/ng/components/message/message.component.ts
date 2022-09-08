import {
  AfterContentInit,
  Component,
  ContentChild,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  TemplateRef
} from '@angular/core';
import {TemplateDirective} from "@ng/directives/template.directive";
import {NgMessageOptions, NgSeverity} from "@ng/models/overlay";
import {Message} from "primeng/api";

@Component({
  selector: 'ng-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements AfterContentInit {
  @Input('message') set setMessage(m: NgMessageOptions) {
    this._message = {...m, severity: this.severity}
  };

  @Input() severity: NgSeverity;
  @Input() inlineMessage: string;
  @Input() closable: boolean;
  @Input() rtl: boolean;
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  _message: Message
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
