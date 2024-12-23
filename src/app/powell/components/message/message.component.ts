import {
  AfterContentInit,
  Component,
  ContentChildren,
  inject,
  Input,
  OnInit,
  QueryList,
  TemplateRef
} from '@angular/core';
import {TemplateDirective} from "@powell/directives/template";
import {NgCssObject} from "@powell/models";
import {ConfigService} from "@powell/api";

@Component({
  selector: 'ng-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  standalone: false
})
export class MessageComponent implements OnInit, AfterContentInit {
  private configService = inject(ConfigService);

  @Input() inlineMessage: string;
  @Input() summary: string;
  @Input() detail: string;
  @Input() icon: string;
  @Input() rtl: boolean;
  @Input() followConfig: boolean;
  @Input() closable: boolean = true;
  @Input() style: NgCssObject;
  @Input() styleClass: string;
  @Input() enableService: boolean = true;
  @Input() key: string;
  @Input() escape: boolean = true;
  @Input() severity: string;
  @Input() showTransitionOptions: string = '300ms ease-out';
  @Input() hideTransitionOptions: string = '200ms cubic-bezier(0.86, 0, 0.07, 1)';

  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  templateMap: Record<string, TemplateRef<any>> = {};

  ngOnInit() {
    this.configService.applyConfigToComponent(this);
  }

  ngAfterContentInit() {
    this.templates.forEach(item => {
      const name = item.getType();
      this.templateMap[name] = item.templateRef;
    });
  }
}
