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
  NgAsyncEvent,
  NgButtonAppearance,
  NgButtonProps,
  NgButtonResponsiveSize,
  NgButtonState,
  NgButtonType,
  NgCssObject,
  NgPosition,
  NgSeverity,
  NgSize
} from '@powell/models';
import {TemplateDirective} from "@powell/directives/template";
import {fromEvent} from "rxjs";
import {DOCUMENT} from "@angular/common";
import {takeUntil} from "rxjs/operators";
import {DestroyService} from "@core/utils";

@Component({
  selector: 'ng-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  host: {'[class.full]': 'fluid'},
  providers: [DestroyService],
  standalone: false
})
export class ButtonComponent implements AfterViewInit, AfterContentInit, OnChanges {
  private document = inject(DOCUMENT);
  private destroy$ = inject(DestroyService);

  @Input() appearance: NgButtonAppearance;
  @Input() responsiveSize: NgButtonResponsiveSize;
  @Input() async: boolean;
  @Input() newLabel: string;
  @Input() newIcon: string;
  @Input() newAppearance: NgButtonAppearance;
  @Input() newSeverity: NgSeverity = 'primary';
  @Input() state: NgButtonState = 1;
  // native properties
  @Input() type: NgButtonType = 'button';
  @Input() iconPos: NgPosition = 'left';
  @Input() icon: string;
  @Input() badge: string;
  @Input() label: string;
  @Input() disabled: boolean;
  @Input() loadingIcon: string;
  @Input() raised: boolean;
  @Input() rounded: boolean;
  @Input() severity: NgSeverity = 'primary';
  @Input() tabindex: number;
  @Input() size: NgSize;
  @Input() style: NgCssObject;
  @Input() styleClass: string;
  @Input() badgeSeverity: NgSeverity = 'primary';
  @Input() ariaLabel: string;
  @Input() autofocus: boolean;
  @Input() fluid: boolean;
  @Input() buttonProps: NgButtonProps;
  @Output() onClick = new EventEmitter<MouseEvent>();
  @Output() onBlur = new EventEmitter<FocusEvent>();
  @Output() onFocus = new EventEmitter<FocusEvent>();
  @Output() stateChange = new EventEmitter<NgButtonState>();
  @Output() onClickAsync = new EventEmitter<NgAsyncEvent<MouseEvent>>();
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  loading: boolean;
  templateMap: Record<string, TemplateRef<any>> = {};
  _tmpLabel: string;
  _tmpIcon: string;
  _tmpAppearance: NgButtonAppearance;
  _tmpSeverity: NgSeverity;
  _tmpSize: NgSize;

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
      const name = item.getType();
      this.templateMap[name] = item.templateRef;
    });
  }

  _onClick(event: MouseEvent) {
    if (this.async) {
      this.loading = true;
      this.state = this.state === 1 ? 2 : 1;
      this.stateChange.emit(this.state);
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
      this.toggleState(this.state);
    }
  }

  toggleState(defaultState: NgButtonState) {
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
