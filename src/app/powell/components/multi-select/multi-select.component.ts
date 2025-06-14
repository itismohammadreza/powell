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
  ChipDisplayMode,
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

  @Input() value: any;
  @Input() label: string;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean;
  @Input() showRequiredStar: boolean;
  @Input() labelPosition: LabelPosition;
  @Input() validation: Validation;
  @Input() followConfig: boolean;
  // native properties
  @Input() id: string;
  @Input() ariaLabel: string;
  @Input() style: CssObject;
  @Input() styleClass: string;
  @Input() panelStyle: CssObject;
  @Input() panelStyleClass: string;
  @Input() inputId: string = $uuid();
  @Input() disabled: boolean;
  @Input() fluid: boolean;
  @Input() readonly: boolean;
  @Input() group: boolean;
  @Input() filter: boolean = true;
  @Input() filterPlaceHolder: string;
  @Input() filterLocale: string;
  @Input() overlayVisible: boolean;
  @Input() tabindex: number;
  @Input() variant: InputVariant;
  @Input() appendTo: any;
  @Input() dataKey: string;
  @Input() name: string;
  @Input() ariaLabelledBy: string;
  @Input() displaySelectedLabel: boolean = true;
  @Input() maxSelectedLabels: number = 3;
  @Input() selectionLimit: number;
  @Input() selectedItemsLabel: string;
  @Input() showToggleAll: boolean = true;
  @Input() emptyFilterMessage: string;
  @Input() emptyMessage: string;
  @Input() resetFilterOnHide: boolean;
  @Input() dropdownIcon: string;
  @Input() chipIcon: string;
  @Input() optionLabel: string;
  @Input() optionValue: string;
  @Input() optionDisabled: string;
  @Input() optionGroupLabel: string = 'label';
  @Input() optionGroupChildren: string = 'items';
  @Input() showHeader: boolean = true;
  @Input() filterBy: string;
  @Input() scrollHeight: string = '200px';
  @Input() lazy: boolean;
  @Input() virtualScroll: boolean;
  @Input() loading: boolean;
  @Input() virtualScrollItemSize: number;
  @Input() loadingIcon: string;
  @Input() virtualScrollOptions: $ScrollerOptions;
  @Input() overlayOptions: $OverlayOptions;
  @Input() ariaFilterLabel: string;
  @Input() filterMatchMode: FilterMatchMode = 'contains';
  @Input() tooltip: string;
  @Input() tooltipPosition: Position = 'right';
  @Input() tooltipPositionStyle: string = 'absolute';
  @Input() tooltipStyleClass: string;
  @Input() autofocusFilter: boolean = true;
  @Input() display: ChipDisplayMode = 'comma';
  @Input() autocomplete: string = 'off';
  @Input() size: Size;
  @Input() showClear: boolean;
  @Input() autofocus: boolean;
  @Input() placeholder: string;
  @Input() options: any[];
  @Input() filterValue: string;
  @Input() selectAll: boolean = null;
  @Input() focusOnHover: boolean = true;
  @Input() filterFields: any[];
  @Input() selectOnFocus: boolean;
  @Input() autoOptionFocus: boolean = true;
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
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  ngControl: NgControl;
  templateMap: Record<string, TemplateRef<any>> = {};
  onModelChange: Function = () => {
  };
  onModelTouched: Function = () => {
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
      currentControl = this.ngControl.control;
      if (controlContainer) {
        parentForm = controlContainer.control;
        rootForm = controlContainer.formDirective as FormGroupDirective;
        if (this.ngControl instanceof FormControlName) {
          currentControl = parentForm.get(this.ngControl.name.toString());
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
    this.templates.forEach(item => {
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

  emitter(name: string, event: any) {
    (this[name] as EventEmitter<any>).emit(event);
  }

  writeValue(value: any) {
    this.value = value;
    this.cd.markForCheck();
  }

  registerOnChange(fn) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }

  setDisabledState(val: boolean) {
    this.disabled = val;
    this.cd.markForCheck();
  }

  protected readonly event = event;
}
