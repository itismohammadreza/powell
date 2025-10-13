import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  DOCUMENT,
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

import {takeUntil} from "rxjs/operators";
import {DestroyService} from "@powell/utils";

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

  @Input() appearance: Optional<ButtonAppearance>;
  @Input() responsiveSize: Optional<ButtonResponsiveSize>;
  @Input() async: boolean = false;
  @Input() newLabel: Optional<string>;
  @Input() newIcon: Optional<string>;
  @Input() newAppearance: Optional<ButtonAppearance>;
  @Input() newSeverity: Severity = 'primary';
  @Input() state: ButtonState = 1;
  // native properties
  @Input() type: ButtonType = 'button';
  @Input() iconPos: Position = 'left';
  @Input() icon: Optional<string>;
  @Input() badge: Optional<string>;
  @Input() label: Optional<string>;
  @Input() disabled: boolean = false;
  @Input() loadingIcon: Optional<string>;
  @Input() raised: boolean = false;
  @Input() rounded: boolean = false;
  @Input() severity: Severity = 'primary';
  @Input() tabindex: Optional<number>;
  @Input() size: Optional<Size>;
  @Input() badgeSeverity: Severity = 'primary';
  @Input() ariaLabel: Optional<string>;
  @Input() autofocus: boolean = false;
  @Input() fluid: boolean = false;
  @Input() buttonProps: Optional<ButtonProps>;
  @Output() onClick = new EventEmitter<MouseEvent>();
  @Output() onBlur = new EventEmitter<FocusEvent>();
  @Output() onFocus = new EventEmitter<FocusEvent>();
  @Output() stateChange = new EventEmitter<ButtonState>();
  @Output() onClickAsync = new EventEmitter<AsyncEvent<MouseEvent>>();
  @ContentChildren(TemplateDirective) templates: Optional<QueryList<TemplateDirective>>;

  loading: boolean = false;
  templateMap: Record<string, TemplateRef<SafeAny>> = {};
  _tmpLabel: Optional<string>;
  _tmpIcon: Optional<string>;
  _tmpAppearance: Optional<ButtonAppearance>;
  _tmpSeverity: Optional<Severity>;
  _tmpSize: Optional<Size>;

  ngOnChanges(changes: SimpleChanges) {
    const {buttonProps} = changes;
    if (buttonProps) {
      const props = buttonProps.currentValue;
      for (const k in props) {
        const key = k as keyof this;
        this[key] = props[key];
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
      const windowWidth = this.document.defaultView?.innerWidth;
      if (windowWidth) {
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
    }

    getButtonSize();

    fromEvent(this.document.defaultView!, 'resize').pipe(takeUntil(this.destroy$)).subscribe(() => {
      getButtonSize();
    })
  }

  ngAfterContentInit() {
    this.templates?.forEach(item => {
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

  emitter(key: keyof this, event: SafeAny) {
    (this[key] as EventEmitter<SafeAny>).emit(event);
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
