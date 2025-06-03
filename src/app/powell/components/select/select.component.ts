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

  @Input() value: any;
  @Input() label: string;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean;
  @Input() showRequiredStar: boolean;
  @Input() labelPosition: LabelPosition;
  @Input() validation: Validation;
  @Input() async: boolean;
  @Input() followConfig: boolean;
  // native properties
  @Input() id: string;
  @Input() scrollHeight: string = '200px';
  @Input() filter: boolean = false;
  @Input() name: string;
  @Input() style: CssObject;
  @Input() panelStyle: CssObject;
  @Input() styleClass: string;
  @Input() panelStyleClass: string;
  @Input() readonly: boolean = false;
  @Input() required: boolean = false;
  @Input() editable: boolean = false;
  @Input() appendTo: any;
  @Input() tabindex: number;
  @Input() placeholder: string;
  @Input() loadingIcon: string;
  @Input() filterPlaceholder: string;
  @Input() filterLocale: string;
  @Input() variant: InputVariant;
  @Input() inputId: string = $uuid();
  @Input() dataKey: string;
  @Input() filterBy: string;
  @Input() filterFields: any[];
  @Input() autofocus: boolean = false;
  @Input() resetFilterOnHide: boolean = false;
  @Input() checkmark: boolean = false;
  @Input() dropdownIcon: string;
  @Input() loading: boolean;
  @Input() optionLabel: string;
  @Input() optionValue: string;
  @Input() optionDisabled: string;
  @Input() optionGroupLabel: string = 'label';
  @Input() optionGroupChildren: string = 'items';
  @Input() group: boolean = false;
  @Input() showClear: boolean = false;
  @Input() emptyFilterMessage: string;
  @Input() emptyMessage: string;
  @Input() lazy: boolean = false;
  @Input() virtualScroll: boolean = false;
  @Input() virtualScrollItemSize: number;
  @Input() virtualScrollOptions: $ScrollerOptions;
  @Input() size: Size;
  @Input() overlayOptions: $OverlayOptions;
  @Input() ariaFilterLabel: string;
  @Input() ariaLabel: string;
  @Input() ariaLabelledBy: string;
  @Input() filterMatchMode: FilterMatchMode = 'contains';
  @Input() maxlength: number;
  @Input() tooltip: string;
  @Input() tooltipPosition: Position = 'right';
  @Input() tooltipPositionStyle: string = 'absolute';
  @Input() tooltipStyleClass: string;
  @Input() focusOnHover: boolean = true;
  @Input() selectOnFocus: boolean = false;
  @Input() autoOptionFocus: boolean = true;
  @Input() autofocusFilter: boolean = true;
  @Input() fluid: boolean;
  @Input() disabled: boolean;
  @Input() filterValue: string;
  @Input() options: any[];
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
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  ngControl: NgControl;
  templateMap: Record<string, TemplateRef<any>> = {};
  _oldValue: string;
  _newValue: string;
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
      this.value = null;
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
}
