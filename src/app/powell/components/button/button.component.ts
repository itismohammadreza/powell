import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import {
  AsyncEvent,
  ButtonAppearance,
  ButtonProps,
  ButtonResponsiveSize,
  ButtonState,
  ButtonType,
  CssObject,
  Position,
  Severity,
  Size
} from '@powell/models';
import {TemplateDirective} from "@powell/directives/template";
import {fromEvent} from "rxjs";
import {DOCUMENT} from "@angular/common";
import {takeUntil} from "rxjs/operators";
import {DestroyService} from "@core/utils";

@Component({
  selector: 'pw-button',
  templateUrl: './button.component.html',
  host: {'[class.full]': 'fluid'},
  providers: [DestroyService],
  standalone: false
})
export class ButtonComponent implements AfterViewInit, AfterContentInit, OnChanges {
  private document = inject(DOCUMENT);
  private destroy$ = inject(DestroyService);

  @Input() appearance: ButtonAppearance;
  @Input() responsiveSize: ButtonResponsiveSize;
  @Input() async: boolean;
  @Input() newLabel: string;
  @Input() newIcon: string;
  @Input() newAppearance: ButtonAppearance;
  @Input() newSeverity: Severity = 'primary';
  @Input() state: ButtonState = 1;
  // native properties
  @Input() type: ButtonType = 'button';
  @Input() iconPos: Position = 'left';
  @Input() icon: string;
  @Input() badge: string;
  @Input() label: string;
  @Input() disabled: boolean;
  @Input() loadingIcon: string;
  @Input() raised: boolean;
  @Input() rounded: boolean;
  @Input() severity: Severity = 'primary';
  @Input() tabindex: number;
  @Input() size: Size;
  @Input() style: CssObject;
  @Input() styleClass: string;
  @Input() badgeSeverity: Severity = 'primary';
  @Input() ariaLabel: string;
  @Input() autofocus: boolean;
  @Input() fluid: boolean;
  @Input() buttonProps: ButtonProps;
  @Output() onClick = new EventEmitter<MouseEvent>();
  @Output() onBlur = new EventEmitter<FocusEvent>();
  @Output() onFocus = new EventEmitter<FocusEvent>();
  @Output() stateChange = new EventEmitter<ButtonState>();
  @Output() onClickAsync = new EventEmitter<AsyncEvent<MouseEvent>>();
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  loading: boolean;
  templateMap: Record<string, TemplateRef<any>> = {};
  _tmpLabel: string;
  _tmpIcon: string;
  _tmpAppearance: ButtonAppearance;
  _tmpSeverity: Severity;
  _tmpSize: Size;

  ngOnChanges(changes: SimpleChanges) {
    const {buttonProps} = changes;
    if (buttonProps) {
      const props = buttonProps.currentValue;
      for (const property in props) {
        this[property] = props[property];
      }
    }

    if (this.async) {
      this.toggleState(this.state);
    }
  }

  ngAfterViewInit() {
    this._tmpSize = this.size;
    const {md, sm, xl, xs, lg} = this.responsiveSize ?? {};
    const getButtonSize = () => {
      const windowWidth = this.document.defaultView.innerWidth;
      if (windowWidth <= 575.98) {
        this.size = xs ?? this._tmpSize;
      } else if (windowWidth <= 767.98) {
        this.size = sm ?? this._tmpSize;
      } else if (windowWidth <= 991.98) {
        this.size = md ?? this._tmpSize;
      } else if (windowWidth <= 1199.98) {
        this.size = lg ?? this._tmpSize;
      } else {
        this.size = xl ?? this._tmpSize;
      }
    }

    getButtonSize();

    fromEvent(this.document.defaultView, 'resize').pipe(takeUntil(this.destroy$)).subscribe(() => {
      getButtonSize();
    })
  }

  ngAfterContentInit() {
    this.templates.forEach(item => {
      const name = item.type;
      this.templateMap[name] = item.templateRef;
    });
  }

  _onClick(event: MouseEvent) {
    if (this.async) {
      this.loading = true;
      this.onClickAsync.emit({event, loadingCallback: this.removeLoading});
    } else {
      this.onClick.emit(event);
    }
  }

  emitter(name: string, event: any) {
    (this[name] as EventEmitter<any>).emit(event);
  }

  removeLoading = (toggle: boolean = false) => {
    this.loading = false;
    if (toggle) {
      this.state = this.state === 1 ? 2 : 1;
      this.stateChange.emit(this.state);
      this.toggleState(this.state);
    }
  }

  toggleState(defaultState: ButtonState) {
    if (!this.disabled) {
      this._tmpLabel = defaultState === 1 ? this.label : this.newLabel || this.label;
      this._tmpIcon = defaultState === 1 ? this.icon : this.newIcon || this.icon;
      this._tmpAppearance = defaultState === 1 ? this.appearance : this.newAppearance || this.appearance;
      this._tmpSeverity = defaultState === 1 ? this.severity : this.newSeverity || this.severity;
    } else {
      this.state = 1;
      this._tmpLabel = this.label;
      this._tmpIcon = this.icon;
      this._tmpAppearance = this.appearance;
      this._tmpSeverity = this.severity;
    }
  }
}
