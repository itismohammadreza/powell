import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  inject,
  Injector,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  FormControlName,
  FormGroup,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl
} from '@angular/forms';
import {takeUntil} from "rxjs";
import {
  AsyncEvent,
  CssObject,
  FilterMatchMode,
  InputVariant,
  LabelPosition,
  Position,
  Size,
  Validation
} from '@powell/models';
import {TemplateDirective} from '@powell/directives/template';
import {
  $OverlayOptions,
  $ScrollerOptions,
  $SelectChangeEvent,
  $SelectFilterEvent,
  $SelectLazyLoadEvent,
  $uuid
} from "@powell/primeng";
import {DestroyService} from "@powell/utils";
import {ConfigService} from "@powell/api";

@Component({
  selector: 'pw-select',
  templateUrl: './select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
    DestroyService
  ],
  standalone: false
})
export class SelectComponent implements OnInit, AfterContentInit, ControlValueAccessor {
  private cd = inject(ChangeDetectorRef);
  private injector = inject(Injector);
  private configService = inject(ConfigService);
  private destroy$ = inject(DestroyService);

  @Input() value: Optional<any>;
  @Input() label: Optional<string>;
  @Input() labelWidth: Optional<number>;
  @Input() hint: Optional<string>;
  @Input() rtl: boolean = false;
  @Input() showRequiredStar: boolean = false;
  @Input() labelPosition: Optional<LabelPosition>;
  @Input() validation: Optional<Validation>;
  @Input() async: boolean = false;
  @Input() followConfig: boolean = false;
  // native properties
  @Input() id: Optional<string>;
  @Input() scrollHeight: string = '200px';
  @Input() filter: boolean = false;
  @Input() name: Optional<string>;
  @Input() style: Optional<CssObject>;
  @Input() panelStyle: Optional<CssObject>;
  @Input() styleClass: Optional<string>;
  @Input() panelStyleClass: Optional<string>;
  @Input() readonly: boolean = false;
  @Input() required: boolean = false;
  @Input() editable: boolean = false;
  @Input() appendTo: Optional<any>;
  @Input() tabindex: Optional<number>;
  @Input() placeholder: Optional<string>;
  @Input() loadingIcon: Optional<string>;
  @Input() filterPlaceholder: Optional<string>;
  @Input() filterLocale: Optional<string>;
  @Input() variant: Optional<InputVariant>;
  @Input() inputId: string = $uuid();
  @Input() dataKey: Optional<string>;
  @Input() filterBy: Optional<string>;
  @Input() filterFields: Optional<any[]>;
  @Input() autofocus: boolean = false;
  @Input() resetFilterOnHide: boolean = false;
  @Input() checkmark: boolean = false;
  @Input() dropdownIcon: Optional<string>;
  @Input() loading: boolean = false;
  @Input() optionLabel: Optional<string>;
  @Input() optionValue: Optional<string>;
  @Input() optionDisabled: Optional<string>;
  @Input() optionGroupLabel: string = 'label';
  @Input() optionGroupChildren: string = 'items';
  @Input() group: boolean = false;
  @Input() showClear: boolean = false;
  @Input() emptyFilterMessage: Optional<string>;
  @Input() emptyMessage: Optional<string>;
  @Input() lazy: boolean = false;
  @Input() virtualScroll: boolean = false;
  @Input() virtualScrollItemSize: Optional<number>;
  @Input() virtualScrollOptions: Optional<$ScrollerOptions>;
  @Input() size: Optional<Size>;
  @Input() overlayOptions: Optional<$OverlayOptions>;
  @Input() ariaFilterLabel: Optional<string>;
  @Input() ariaLabel: Optional<string>;
  @Input() ariaLabelledBy: Optional<string>;
  @Input() filterMatchMode: FilterMatchMode = 'contains';
  @Input() maxlength: Optional<number>;
  @Input() tooltip: Optional<string>;
  @Input() tooltipPosition: Position = 'right';
  @Input() tooltipPositionStyle: string = 'absolute';
  @Input() tooltipStyleClass: Optional<string>;
  @Input() focusOnHover: boolean = true;
  @Input() selectOnFocus: boolean = false;
  @Input() autoOptionFocus: boolean = true;
  @Input() autofocusFilter: boolean = true;
  @Input() fluid: boolean = false;
  @Input() disabled: boolean = false;
  @Input() filterValue: Optional<string>;
  @Input() options: Optional<any[]>;
  @Output() onChange = new EventEmitter<$SelectChangeEvent>();
  @Output() onFilter = new EventEmitter<$SelectFilterEvent>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();
  @Output() onClick = new EventEmitter<MouseEvent>();
  @Output() onShow = new EventEmitter<AnimationEvent>();
  @Output() onHide = new EventEmitter<AnimationEvent>();
  @Output() onClear = new EventEmitter<void>();
  @Output() onLazyLoad = new EventEmitter<$SelectLazyLoadEvent>();
  @Output() onChangeAsync = new EventEmitter<AsyncEvent<$SelectChangeEvent>>();
  @ContentChildren(TemplateDirective) templates: Optional<QueryList<TemplateDirective>>;

  ngControl: Nullable<NgControl> = null;
  templateMap: Record<string, TemplateRef<any>> = {};
  _oldValue: Optional<string>;
  _newValue: Optional<string>;
  onModelChange: Fn = () => {
  };
  onModelTouched: Fn = () => {
  };

  ngOnInit() {
    let parentForm: FormGroup;
    let rootForm: FormGroupDirective;
    let currentControl: AbstractControl;
    const controlContainer = this.injector.get(
      ControlContainer,
      null,
      {optional: true, host: true, skipSelf: true}
    ) as FormGroupDirective;
    this.ngControl = this.injector.get(NgControl, null);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
      currentControl = this.ngControl.control!;
      if (controlContainer) {
        parentForm = controlContainer.control;
        rootForm = controlContainer.formDirective as FormGroupDirective;
        if (this.ngControl instanceof FormControlName) {
          currentControl = parentForm.get(this.ngControl.name!.toString())!;
        }
        rootForm.ngSubmit.pipe(takeUntil(this.destroy$)).subscribe(() => {
          if (!this.disabled) {
            currentControl.markAsTouched();
          }
        });
      }
    }
    this.configService.configureComponent(this);
  }

  ngAfterContentInit() {
    this.templates?.forEach(item => {
      const name = item.type;
      this.templateMap[name] = item.templateRef;
    });
  }

  _onChange(event: $SelectChangeEvent) {
    if (this.async) {
      this.disabled = true;
      this._oldValue = this.value;
      this._newValue = event.value;
      this.loading = true;
      this.onChangeAsync.emit({loadingCallback: this.removeLoading, event});
    } else {
      this.value = event.value;
      this.onChange.emit(event);
      this.onModelChange(event.value);
    }
  }

  removeLoading = (ok: boolean = true) => {
    this.loading = false;
    this.disabled = false;

    if (ok) {
      this.value = this._newValue;
      this.onModelChange(this.value);
    } else {
      this.value = undefined;
      setTimeout(() => {
        this.value = this._oldValue + '';
        this.onModelChange(this.value);
      }, 0)
    }
    this.cd.detectChanges()
  }

  _onBlur(event: Event) {
    this.onBlur.emit(event);
    this.onModelTouched();
  }

  _onClear() {
    this.onClear.emit();
    this.onModelChange(null);
  }

  emitter(key: keyof this, event: SafeAny) {
    (this[key] as EventEmitter<SafeAny>).emit(event);
  }

  writeValue(value: any) {
    this.value = value;
    this.cd.markForCheck();
  }

  registerOnChange(fn: Fn) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Fn) {
    this.onModelTouched = fn;
  }

  setDisabledState(val: boolean) {
    this.disabled = val;
    this.cd.markForCheck();
  }
}
