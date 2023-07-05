import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output
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
} from "@angular/forms";
import {
  NgAddon,
  NgDatepickerDateType,
  NgDatepickerHourFormat,
  NgDatepickerSelectionMode,
  NgDatepickerViewMode,
  NgIconPosition,
  NgLabelPosition,
  NgSize,
  NgValidation
} from "@powell/models";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'ng-gregorian-datepicker',
  templateUrl: './gregorian-datepicker.component.html',
  styleUrls: ['./gregorian-datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GregorianDatepickerComponent),
      multi: true,
    },
  ],
})
export class GregorianDatepickerComponent implements OnInit, ControlValueAccessor, OnDestroy {
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
  @Input() disableConfigChangeEffect: boolean;
  // native properties
  @Input() defaultDate: Date;
  @Input() selectionMode: NgDatepickerSelectionMode = 'single';
  @Input() style: any;
  @Input() styleClass: string;
  @Input() inputStyle: any;
  @Input() inputStyleClass: string;
  @Input() placeholder: string;
  @Input() disabled: boolean;
  @Input() dateFormat: string = 'mm/dd/yy';
  @Input() inline: boolean;
  @Input() showOtherMonths: boolean = true;
  @Input() selectOtherMonths: boolean;
  @Input() showIcon: boolean;
  @Input() showOnFocus: boolean = true;
  @Input() showWeek: boolean;
  @Input() datePickerIcon: string = 'pi pi-calendar';
  @Input() appendTo: any;
  @Input() readonlyInput: boolean;
  @Input() shortYearCutoff: string = '+10';
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() disabledDates: any[];
  @Input() disabledDays: any[];
  @Input() showTime: boolean;
  @Input() hourFormat: NgDatepickerHourFormat = '24';
  @Input() timeOnly: boolean;
  @Input() timeSeparator: string = ':';
  @Input() dataType: NgDatepickerDateType = 'date';
  @Input() tabindex: number;
  @Input() showSeconds: boolean;
  @Input() stepHour: number = 1;
  @Input() stepMinute: number = 1;
  @Input() stepSecond: number = 1;
  @Input() maxDateCount: number;
  @Input() showButtonBar: boolean;
  @Input() todayButtonStyleClass: string = 'p-secondary-button';
  @Input() clearButtonStyleClass: string = 'p-secondary-button';
  @Input() baseZIndex: number;
  @Input() autoZIndex: boolean = true;
  @Input() panelStyleClass: string;
  @Input() panelStyle: object;
  @Input() keepInvalid: boolean;
  @Input() hideOnDateTimeSelect: boolean = true;
  @Input() numberOfMonths: number = 1;
  @Input() view: NgDatepickerViewMode = 'date';
  @Input() multipleSeparator: string = ',';
  @Input() rangeSeparator: string = '-';
  @Input() touchUI: boolean;
  @Input() focusTrap: boolean = true;
  @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';
  @Input() hideTransitionOptions: string = '.1s linear';
  @Input() firstDayOfWeek: number = 0;
  @Input() showClear: boolean;
  @Output() onSelect = new EventEmitter();
  @Output() onBlur = new EventEmitter();
  @Output() onFocus = new EventEmitter();
  @Output() onClose = new EventEmitter();
  @Output() onShow = new EventEmitter();
  @Output() onClickOutside = new EventEmitter();
  @Output() onInput = new EventEmitter();
  @Output() onTodayClick = new EventEmitter();
  @Output() onClearClick = new EventEmitter();
  @Output() onMonthChange = new EventEmitter();
  @Output() onYearChange = new EventEmitter();
  @Output() onClear = new EventEmitter();

  inputId: string;
  ngControl: NgControl;
  destroy$ = new Subject();
  onModelChange: any = (_: any) => {
  };
  onModelTouched: any = () => {
  };

  constructor(private cd: ChangeDetectorRef, private injector: Injector) {
  }

  ngOnInit() {
    this.inputId = this.getId();
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
  }

  _onInput(event: Event) {
    this.onInput.emit(event);
    this.onModelChange(this.value);
  }

  _onSelect(event) {
    this.onSelect.emit(event);
    this.onModelChange(event);
  }

  _onBlur() {
    this.onBlur.emit();
    this.onModelTouched();
  }

  _onClear() {
    this.onClear.emit();
    this.onModelChange(null);
  }

  emitter(name: string, event: any) {
    (this[name] as EventEmitter<any>).emit(event);
  }

  getId() {
    return "id" + Math.random().toString(16).slice(2)
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

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
