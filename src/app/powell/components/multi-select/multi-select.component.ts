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
  ChipDisplayMode, CssObject,
  FilterMatchMode,
  InputVariant,
  LabelPosition,
  Position,
  Size,
  Validation
} from '@powell/models';
import {TemplateDirective} from '@powell/directives/template';
import {
  $MultiSelectBlurEvent,
  $MultiSelectChangeEvent,
  $MultiSelectFilterEvent,
  $MultiSelectFocusEvent,
  $MultiSelectLazyLoadEvent,
  $MultiSelectRemoveEvent,
  $MultiSelectSelectAllChangeEvent,
  $OverlayOptions,
  $ScrollerOptions,
  $uuid
} from "@powell/primeng";
import {DestroyService} from "@powell/utils";
import {ConfigService} from "@powell/api";

@Component({
  selector: 'pw-multi-select',
  templateUrl: './multi-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true
    },
    DestroyService
  ],
  standalone: false
})
export class MultiSelectComponent implements OnInit, ControlValueAccessor, AfterContentInit {
  private cd = inject(ChangeDetectorRef);
  private injector = inject(Injector);
  private configService = inject(ConfigService);
  private destroy$ = inject(DestroyService);

  @Input() value: Optional<SafeAny>;
  @Input() label: Optional<string>;
  @Input() labelWidth: Optional<number>;
  @Input() hint: Optional<string>;
  @Input() rtl: Optional<boolean>;
  @Input() showRequiredStar: Optional<boolean>;
  @Input() labelPosition: Optional<LabelPosition>;
  @Input() validation: Optional<Validation>;
  @Input() followConfig: Optional<boolean>;
  // native properties
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() name: Optional<string>;
  @Input() id: Optional<string>;
  @Input() ariaLabel: Optional<string>;
  @Input() panelStyle: Optional<CssObject>;
  @Input() panelStyleClass: Optional<string>;
  @Input() inputId: string = $uuid();
  @Input() readonly: boolean = false;
  @Input() group: boolean = false;
  @Input() filter: boolean = true;
  @Input() filterPlaceHolder: Optional<string>;
  @Input() filterLocale: Optional<string>;
  @Input() overlayVisible: boolean = false;
  @Input() tabindex: Optional<number>;
  @Input() dataKey: Optional<string>;
  @Input() ariaLabelledBy: Optional<string>;
  @Input() displaySelectedLabel: boolean = true;
  @Input() maxSelectedLabels: number = 3;
  @Input() selectionLimit: Optional<number>;
  @Input() selectedItemsLabel: Optional<string>;
  @Input() showToggleAll: boolean = true;
  @Input() emptyFilterMessage: Optional<string>;
  @Input() emptyMessage: Optional<string>;
  @Input() resetFilterOnHide: boolean = false;
  @Input() dropdownIcon: Optional<string>;
  @Input() chipIcon: Optional<string>;
  @Input() optionLabel: Optional<string>;
  @Input() optionValue: Optional<string>;
  @Input() optionDisabled: Optional<string>;
  @Input() optionGroupLabel: string = 'label';
  @Input() optionGroupChildren: string = 'items';
  @Input() showHeader: boolean = true;
  @Input() filterBy: Optional<string>;
  @Input() scrollHeight: string = '200px';
  @Input() lazy: boolean = false;
  @Input() virtualScroll: boolean = false;
  @Input() loading: boolean = false;
  @Input() virtualScrollItemSize: Optional<number>;
  @Input() loadingIcon: Optional<string>;
  @Input() virtualScrollOptions: Optional<$ScrollerOptions>;
  @Input() overlayOptions: Optional<$OverlayOptions>;
  @Input() ariaFilterLabel: Optional<string>;
  @Input() filterMatchMode: FilterMatchMode = 'contains';
  @Input() tooltip: Optional<string>;
  @Input() tooltipPosition: Position = 'right';
  @Input() tooltipPositionStyle: string = 'absolute';
  @Input() tooltipStyleClass: Optional<string>;
  @Input() autofocusFilter: boolean = false;
  @Input() display: ChipDisplayMode = 'comma';
  @Input() autocomplete: string = 'off';
  @Input() showClear: boolean = false;
  @Input() autofocus: boolean = false;
  @Input() placeholder: Optional<string>;
  @Input() options: Optional<SafeAny[]>;
  @Input() filterValue: Optional<string>;
  @Input() selectAll: Nullable<boolean> = null;
  @Input() focusOnHover: boolean = true;
  @Input() filterFields: Optional<SafeAny[]>;
  @Input() selectOnFocus: boolean = false;
  @Input() autoOptionFocus: boolean = false;
  @Input() highlightOnSelect: boolean = true;
  @Input() size: Optional<Size>;
  @Input() variant: Optional<InputVariant>;
  @Input() fluid: boolean = false;
  @Input() appendTo: Optional<SafeAny>;
  @Output() onChange = new EventEmitter<$MultiSelectChangeEvent>();
  @Output() onFilter = new EventEmitter<$MultiSelectFilterEvent>();
  @Output() onFocus = new EventEmitter<$MultiSelectFocusEvent>();
  @Output() onBlur = new EventEmitter<$MultiSelectBlurEvent>();
  @Output() onClick = new EventEmitter<Event>();
  @Output() onClear = new EventEmitter<void>();
  @Output() onPanelShow = new EventEmitter<void>();
  @Output() onPanelHide = new EventEmitter<void>();
  @Output() onLazyLoad = new EventEmitter<$MultiSelectLazyLoadEvent>();
  @Output() onRemove = new EventEmitter<$MultiSelectRemoveEvent>();
  @Output() onSelectAllChange = new EventEmitter<$MultiSelectSelectAllChangeEvent>();
  @ContentChildren(TemplateDirective) templates: Optional<QueryList<TemplateDirective>>;

  ngControl: Nullable<NgControl> = null;
  templateMap: Record<string, TemplateRef<SafeAny>> = {};
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

  _onChange(event: $MultiSelectChangeEvent) {
    this.onChange.emit(event);
    this.onModelChange(event.value);
  }

  _onBlur(event: $MultiSelectBlurEvent) {
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

  writeValue(value: SafeAny) {
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

  protected readonly event = event;
}
