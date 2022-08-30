import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  InjectFlags,
  Injector,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  FormControlName,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgModel,
  UntypedFormGroup,
} from '@angular/forms';
import {NgAddon, NgDatePickerMode, NgError, NgLabelPosition} from '@ng/models/forms';
import {NgPosition, NgSize} from '@ng/models/offset';
import * as moment from 'jalali-moment';
import {ECalendarValue, IDatePickerConfig} from 'ng2-jalali-date-picker';

@Component({
  selector: 'ng-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
})
export class DatePickerComponent implements OnInit, OnChanges, AfterViewInit, ControlValueAccessor {
  @Input() value: any;
  @Input() label: string;
  @Input() filled: boolean;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean;
  @Input() showRequiredStar: boolean = true;
  @Input() icon: string;
  @Input() labelPos: NgLabelPosition = 'fix-top';
  @Input() iconPos: NgPosition = 'left';
  @Input() addon: NgAddon
  @Input() errors: NgError;
  @Input() inputSize: NgSize = 'md';
  @Input() locale: string = 'fa';
  @Input() appendTo: any = 'body';
  @Input() readonly: boolean;
  @Input() disabled: boolean;
  @Input() maxlength: number;
  @Input() placeholder: string;
  @Input() datePickerMode: NgDatePickerMode = 'day';
  @Input() inline: boolean;
  @Input() clearable: boolean;
  @Output() onChange = new EventEmitter();
  @Output() onBlur = new EventEmitter();
  @Output() onFocus = new EventEmitter();
  @Output() onOpen = new EventEmitter();
  @Output() onClose = new EventEmitter();
  @Output() onGoToCurrent = new EventEmitter();
  @Output() onLeftNav = new EventEmitter();
  @Output() onRightNav = new EventEmitter();
  @Output() onSelect = new EventEmitter();
  @Output() onMonthSelect = new EventEmitter();
  @Output() onNavHeaderBtnClick = new EventEmitter();
  @Output() onBeforeBtnClick = new EventEmitter();
  @Output() onAfterBtnClick = new EventEmitter();

  config: IDatePickerConfig = {
    disableKeypress: true,
    closeOnSelect: true,
    openOnClick: !this.readonly,
    openOnFocus: !this.readonly,
    allowMultiSelect: false,
    showTwentyFourHours: true,
    showGoToCurrent: true,
    locale: moment.locale(this.locale),
    closeOnSelectDelay: 100,
    appendTo: this.appendTo,
    showSeconds: true,
    returnedValueType: ECalendarValue.Moment,
  };
  inputId: string;
  controlContainer: FormGroupDirective;
  ngControl: NgControl;
  _miladiMonths = [
    'ژانویه ',
    'فوریه ',
    'مارس',
    'آوریل',
    'می',
    'ژوئن',
    'جولای',
    'آگوست',
    'سپتامبر',
    'اکتبر',
    'نوامبر',
    'دسامبر',
  ];
  _months = [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند',
  ];
  _weeks: string[] = [
    'شنبه',
    'یکشنبه',
    'دوشنبه',
    'سه شنبه',
    'چهارشنبه',
    'پنج شنبه',
    'جمعه',
  ];
  onModelChange: any = (_: any) => {
  };
  onModelTouched: any = () => {
  };

  constructor(
    private cd: ChangeDetectorRef,
    private injector: Injector,
  ) {
  }


  ngOnInit() {
    this.inputId = this.getId();
    let parentForm: UntypedFormGroup;
    let rootForm: FormGroupDirective;
    let currentControl: AbstractControl;
    this.controlContainer = this.injector.get(
      ControlContainer,
      null,
      InjectFlags.Optional || InjectFlags.Host || InjectFlags.SkipSelf
    ) as FormGroupDirective;
    this.ngControl = this.injector.get(NgControl, null);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
      // by default we suppose the ngControl is and instance of NgModel.
      currentControl = this.ngControl.control;
      if (this.controlContainer) {
        parentForm = this.controlContainer.control;
        rootForm = this.controlContainer.formDirective as FormGroupDirective;
        // only when we have a formGroup (here is : controlContainer), we also may have formControlName instance.
        // so we check this condition when we have a controlContainer and overwrite currentControl value.
        if (this.ngControl instanceof FormControlName) {
          currentControl = parentForm.get(this.ngControl.name.toString());
        }
        rootForm.ngSubmit.subscribe(() => {
          if (!this.disabled) {
            currentControl.markAsTouched();
          }
        });
      }
    }
  }

  ngOnChanges() {
    this.config.locale = moment.locale(this.locale);
  }

  ngAfterViewInit() {
    if (this.showRequiredStar && this.isRequired()) {
      if (this.label) {
        this.label += ' *';
      }
      if (this.placeholder) {
        this.placeholder += ' *';
      }
      this.cd.detectChanges();
    }
  }

  _onChange(event) {
    if (event) {
      let result;
      const moment = (this.inline ? event.date : event) as moment.Moment;
      const date = (this.inline ? event.date._d : event._d) as Date;
      switch (this.datePickerMode) {
        case 'daytime':
        case 'day': {
          result = {
            strWeekDay: this.getStrWeekDay(date),
            strMonth: this._months[moment.month()],
            miladiStrMonth: this._miladiMonths[date.getMonth()],
            dateObj: date,
            momentObj: moment,
          };
          break;
        }
        case 'month': {
          result = {
            strMonth: this._months[moment.month()],
            miladiStrMonth: this._miladiMonths[date.getMonth()],
            momentObj: moment,
            dateObj: date,
          };
          break;
        }
        case 'time': {
          result = {
            momentObj: moment,
            dateObj: date,
          };
          break;
        }
      }
      this.onChange.emit(result);
      this.onModelChange(date);
    }
  }

  _onBlur() {
    this.onBlur.emit();
    this.onModelTouched();
  }

  emitter(name: string, event: any) {
    (this[name] as EventEmitter<any>).emit(event);
  }

  getStrWeekDay(momentObj: Date): string {
    let strWeekDay: string;
    if (momentObj.getDay() === 6) {
      strWeekDay = this._weeks[0];
    } else {
      strWeekDay = this._weeks[momentObj.getDay() + 1];
    }
    return strWeekDay;
  }

  onClearClick() {
    this.value = undefined;
    this.onModelChange(null);
  }

  getId() {
    return "id" + Math.random().toString(16).slice(2)
  }

  isInvalid() {
    if (this.ngControl) {
      const control = this.ngControl.control;
      return (control.touched || control.dirty) && control.invalid;
    }
  }

  showError(errorType: string): boolean {
    return (
      this.isInvalid() && this.ngControl.control.hasError(errorType.toLowerCase())
    );
  }

  showHint() {
    let hasError = false;
    for (const error in this.errors) {
      if (this.showError(error)) {
        hasError = true
      };
    }
    return !hasError;
  }

  isRequired(): boolean {
    if (this.ngControl) {
      const control = this.ngControl.control;
      if (control.validator) {
        const validator = control.validator({} as AbstractControl);
        if (validator && validator.required) {
          return true;
        }
      }
    }
    return false;
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
