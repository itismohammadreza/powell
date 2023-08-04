import {ChangeDetectorRef, Component, EventEmitter, forwardRef, Injector, Input, OnInit, Output} from '@angular/core';
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
import {takeUntil} from "rxjs";
import {DestroyService} from "@core/utils";
import {PrimeCalendarMonthChangeEvent, PrimeCalendarYearChangeEvent} from "@powell/primeng/api";

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
    DestroyService
  ],
})
export class GregorianDatepickerComponent implements OnInit, ControlValueAccessor {
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
  @Output() onSelect = new EventEmitter<Date>();
  @Output() onBlur = new EventEmitter<Event>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onClose = new EventEmitter<AnimationEvent>();
  @Output() onShow = new EventEmitter<AnimationEvent>();
  @Output() onClickOutside = new EventEmitter<Event>();
  @Output() onInput = new EventEmitter<KeyboardEvent>();
  @Output() onTodayClick = new EventEmitter<Date>();
  @Output() onClearClick = new EventEmitter<Event>();
  @Output() onMonthChange = new EventEmitter<PrimeCalendarMonthChangeEvent>();
  @Output() onYearChange = new EventEmitter<PrimeCalendarYearChangeEvent>();
  @Output() onClear = new EventEmitter<void>();

  inputId: string;
  ngControl: NgControl;
  onModelChange: any = (_: any) => {
  };
  onModelTouched: any = () => {
  };

  constructor(private cd: ChangeDetectorRef,
              private injector: Injector,
              private destroy$: DestroyService) {
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

  _onInput(event: KeyboardEvent) {
    this.onInput.emit(event);
    this.onModelChange(this.value);
  }

  _onSelect(event: Date) {
    this.onSelect.emit(event);
    this.onModelChange(event);
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
}
