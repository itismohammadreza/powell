import {
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  Output, QueryList,
  SimpleChanges, TemplateRef
} from '@angular/core';
import {NgButtonAppearance, NgButtonType, NgColor, NgIconPosition, NgSize} from '@powell/models';
import {TemplateDirective} from "@powell/directives/template";

@Component({
  selector: 'ng-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  host: {'[class.full]': 'full'}
})
export class ButtonComponent implements AfterViewInit, OnChanges {
  @Input() appearance: NgButtonAppearance;
  @Input() rounded: boolean;
  @Input() raised: boolean;
  @Input() color: NgColor = 'primary';
  @Input() full: boolean;
  @Input() badgeColor: NgColor = 'primary';
  @Input() size: NgSize = 'md';
  @Input() async: boolean;
  @Input() newLabel: string;
  @Input() newIcon: string;
  @Input() newAppearance: NgButtonAppearance;
  @Input() newColor: NgColor = 'primary';
  @Input() defaultState: 1 | 2 = 1;
  // native properties
  @Input() type: NgButtonType = 'button';
  @Input() label: string;
  @Input() icon: string;
  @Input() iconPos: NgIconPosition = 'left';
  @Input() badge: string;
  @Input() badgeClass: string;
  @Input() loadingIcon: string;
  @Input() disabled: boolean;
  @Input() style: any;
  @Input() styleClass: any;
  @Output() onClick = new EventEmitter();
  @Output() defaultStateChange = new EventEmitter();
  @Output() onClickAsync = new EventEmitter();
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  loading: boolean;
  contentTemplate: TemplateRef<any>;
  iconTemplate: TemplateRef<any>;
  loadingIconTemplate: TemplateRef<any>;
  _tmpLabel: string;
  _tmpIcon: string;
  _tmpAppearance: NgButtonAppearance;
  _tmpColor: NgColor;

  ngOnChanges(changes: SimpleChanges) {
    if (this.async) {
      this.toggleState(this.defaultState);
    }
  }

  ngAfterViewInit() {
    this.templates.forEach((item: TemplateDirective) => {
      switch (item.getType()) {
        case 'content':
          this.contentTemplate = item.templateRef;
          break;

        case 'icon':
          this.iconTemplate = item.templateRef;
          break;

        case 'loadingIcon':
          this.loadingIconTemplate = item.templateRef;
          break;
      }
    });
  }

  _onClick(event: any) {
    if (this.async) {
      this.loading = true;
      this.defaultState = this.defaultState === 1 ? 2 : 1;
      this.defaultStateChange.emit(this.defaultState);
      this.onClickAsync.emit(this.removeLoading);
    } else {
      this.onClick.emit(event);
    }
  }

  removeLoading = (ok: boolean = true) => {
    this.loading = false;
    if (ok) {
      this.toggleState(this.defaultState);
    }
  };

  toggleState(defaultState: 1 | 2) {
    if (!this.disabled) {
      this._tmpLabel = defaultState === 1 ? this.label : this.newLabel || this.label;
      this._tmpIcon = defaultState === 1 ? this.icon : this.newIcon || this.icon;
      this._tmpAppearance = defaultState === 1 ? this.appearance : this.newAppearance || this.appearance;
      this._tmpColor = defaultState === 1 ? this.color : this.newColor || this.color;
    } else {
      this.defaultState = 1;
      this._tmpLabel = this.label;
      this._tmpIcon = this.icon;
      this._tmpAppearance = this.appearance;
      this._tmpColor = this.color;
    }
  }
}
