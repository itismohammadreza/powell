import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
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
  NgAddon,
  NgAsyncEvent,
  NgCssObject,
  NgFilterMatchMode,
  NgIconPosition,
  NgLabelPosition,
  NgPosition,
  NgSize,
  NgValidation
} from '@powell/models';
import {TemplateDirective} from '@powell/directives/template';
import {
  PrimeDropdownChangeEvent,
  PrimeDropdownFilterEvent,
  PrimeDropdownLazyLoadEvent,
  PrimeOverlayOptions,
  PrimeScrollerOptions,
  PrimeUniqueComponentId
} from "@powell/primeng/api";
import {DestroyService} from "@core/utils";

@Component({
  selector: 'ng-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
    DestroyService
  ],
})
export class DropdownComponent implements OnInit, AfterContentInit, ControlValueAccessor {
  @Input() value: any;
  @Input() label: string;
  @Input() filled: boolean;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean;
  @Input() showRequiredStar: boolean;
  @Input() icon: string;
  @Input() labelPos: NgLabelPosition;
  @Input() iconPos: NgIconPosition = 'left';
  @Input() addon: NgAddon;
  @Input() validation: NgValidation;
  @Input() inputSize: NgSize;
  @Input() async: boolean;
  @Input() disableConfigChangeEffect: boolean;
  // native properties
  @Input() id: string;
  @Input() scrollHeight: string = '200px';
  @Input() filter: boolean = false;
  @Input() name: string;
  @Input() style: NgCssObject;
  @Input() panelStyle: NgCssObject;
  @Input() styleClass: string;
  @Input() panelStyleClass: string;
  @Input() readonly: boolean = false;
  @Input() editable: boolean = false;
  @Input() appendTo: any;
  @Input() tabindex: number;
  @Input() placeholder: string;
  @Input() filterPlaceholder: string;
  @Input() filterLocale: string;
  @Input() inputId: string = PrimeUniqueComponentId();
  @Input() dataKey: string;
  @Input() filterBy: string;
  @Input() filterFields: any[];
  @Input() autofocus: boolean = false;
  @Input() resetFilterOnHide: boolean = false;
  @Input() dropdownIcon: string;
  @Input() optionLabel: string;
  @Input() optionValue: string;
  @Input() optionDisabled: string;
  @Input() optionGroupLabel: string = 'label';
  @Input() optionGroupChildren: string = 'items';
  @Input() autoDisplayFirst: boolean = true;
  @Input() group: boolean = false;
  @Input() showClear: boolean = false;
  @Input() emptyFilterMessage: string;
  @Input() emptyMessage: string;
  @Input() lazy: boolean = false;
  @Input() virtualScroll: boolean = false;
  @Input() virtualScrollItemSize: number;
  @Input() virtualScrollOptions: PrimeScrollerOptions;
  @Input() overlayOptions: PrimeOverlayOptions;
  @Input() ariaFilterLabel: string;
  @Input() ariaLabel: string;
  @Input() ariaLabelledBy: string;
  @Input() filterMatchMode: NgFilterMatchMode = 'contains';
  @Input() maxlength: number;
  @Input() tooltip: string;
  @Input() tooltipPosition: NgPosition = 'right';
  @Input() tooltipPositionStyle: string = 'absolute';
  @Input() tooltipStyleClass: string;
  @Input() focusOnHover: boolean = false;
  @Input() selectOnFocus: boolean = false;
  @Input() autoOptionFocus: boolean = true;
  @Input() autofocusFilter: boolean = true;
  @Input() disabled: boolean;
  @Input() itemSize: number;
  @Input() autoZIndex: boolean;
  @Input() baseZIndex: number;
  @Input() showTransitionOptions: string;
  @Input() hideTransitionOptions: string;
  @Input() filterValue: string;
  @Input() options: any[];
  @Output() onChange = new EventEmitter<PrimeDropdownChangeEvent>();
  @Output() onFilter = new EventEmitter<PrimeDropdownFilterEvent>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();
  @Output() onClick = new EventEmitter<MouseEvent>();
  @Output() onShow = new EventEmitter<AnimationEvent>();
  @Output() onHide = new EventEmitter<AnimationEvent>();
  @Output() onClear = new EventEmitter<void>();
  @Output() onLazyLoad = new EventEmitter<PrimeDropdownLazyLoadEvent>();
  @Output() onChangeAsync = new EventEmitter<NgAsyncEvent<PrimeDropdownChangeEvent>>();
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  ngControl: NgControl;
  templateMap: Record<string, TemplateRef<any>> = {};
  _oldIcon: string;
  _oldValue: string;
  _newValue: string;
  onModelChange: Function = () => {
  };
  onModelTouched: Function = () => {
  };

  constructor(private cd: ChangeDetectorRef,
              private injector: Injector,
              private destroy$: DestroyService) {
  }

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
    if (this.autoDisplayFirst) {
      this.onModelChange(this.options[0][this.optionValue])
    }
  }

  ngAfterContentInit() {
    this.templates.forEach(item => {
      const name = item.getType();
      this.templateMap[name] = item.templateRef;
    });
  }

  _onChange(event: PrimeDropdownChangeEvent) {
    if (this.async) {
      this.disabled = true;
      this._oldIcon = this.icon;
      this._oldValue = this.value;
      this._newValue = event.value;
      this.icon = 'pi pi-spinner pi-spin';
      this.onChangeAsync.emit({loadingCallback: this.removeLoading, event});
    } else {
      this.value = event.value;
      this.onChange.emit(event);
      this.onModelChange(event.value);
    }
  }

  removeLoading = (ok: boolean = true) => {
    this.icon = this._oldIcon;
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

  isInvalid() {
    if (this.ngControl) {
      const control = this.ngControl.control;
      return (!this.disabled && (control.touched || control.dirty) && control.invalid);
    }
    return false
  }

  hasError(type: string) {
    return this.isInvalid() && this.ngControl.control.hasError(type);
  }

  showHint() {
    let hasError = false;
    for (const errorKey in this.validation) {
      if (this.hasError(errorKey)) {
        hasError = true;
      }
    }
    return !hasError;
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
