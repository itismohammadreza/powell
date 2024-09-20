import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  inject,
  Injector,
  Input,
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
import {takeUntil} from "rxjs";
import {Moment} from "jalali-moment";
import {
  NgAddon,
  NgCssObject,
  NgDatepickerDateType,
  NgDatepickerHourFormat,
  NgDatepickerSelectionMode,
  NgIconPosition,
  NgInputVariant,
  NgLabelPosition,
  NgSize,
  NgValidation
} from "@powell/models";
import {DestroyService} from "@core/utils";
import {AnimationEvent} from "@angular/animations";
import {
  $CalendarMonthChangeEvent,
  $CalendarResponsiveOptions,
  $CalendarTypeView,
  $CalendarYearChangeEvent,
  $LocaleSettings,
  $UniqueComponentId
} from "@powell/primeng";
import {ConfigService} from "@powell/api";

@Component({
  selector: 'ng-jalali-datepicker',
  templateUrl: './jalali-datepicker.component.html',
  styleUrls: ['./jalali-datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => JalaliDatepickerComponent),
      multi: true
    },
    DestroyService
  ]
})
export class JalaliDatepickerComponent implements OnInit, ControlValueAccessor {
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
  @Input() icon: string;
  @Input() labelPos: NgLabelPosition;
  @Input() iconPos: NgIconPosition = 'left';
  @Input() addon: NgAddon;
  @Input() validation: NgValidation;
  @Input() inputSize: NgSize;
  @Input() followConfig: boolean;
  // native properties
  @Input() style: NgCssObject;
  @Input() styleClass: string;
  @Input() inputStyle: NgCssObject;
  @Input() inputId: string = $UniqueComponentId();
  @Input() name: string;
  @Input() inputStyleClass: string;
  @Input() placeholder: string;
  @Input() ariaLabelledBy: string;
  @Input() ariaLabel: string;
  @Input() iconAriaLabel: string;
  @Input() disabled: boolean = false;
  @Input() dateFormat: string;
  @Input() multipleSeparator: string = ',';
  @Input() rangeSeparator: string = '-';
  @Input() inline: boolean = false;
  @Input() showOtherMonths: boolean = true;
  @Input() selectOtherMonths: boolean = false;
  @Input() showIcon: boolean = false;
  @Input() datepickerIcon: string;
  @Input() appendTo: any;
  @Input() readonlyInput: boolean = false;
  @Input() shortYearCutoff: string = '+10';
  @Input() monthNavigator: boolean = false;
  @Input() yearNavigator: boolean = false;
  @Input() hourFormat: NgDatepickerHourFormat = '24';
  @Input() timeOnly: boolean = false;
  @Input() stepYearPicker: number = 10;
  @Input() stepHour: number = 1;
  @Input() stepMinute: number = 1;
  @Input() stepSecond: number = 1;
  @Input() showSeconds: boolean = false;
  @Input() required: boolean = false;
  @Input() showOnFocus: boolean = true;
  @Input() showWeek: boolean = false;
  @Input() startWeekFromFirstDayOfYear: boolean = false;
  @Input() showClear: boolean = false;
  @Input() dataType: NgDatepickerDateType = 'date';
  @Input() selectionMode: NgDatepickerSelectionMode = 'single';
  @Input() maxDateCount: number;
  @Input() showButtonBar: boolean = false;
  @Input() todayButtonStyleClass: string = 'p-button-text';
  @Input() clearButtonStyleClass: string = 'p-button-text';
  @Input() autofocus: boolean = false;
  @Input() autoZIndex: boolean = true;
  @Input() baseZIndex: number = 0;
  @Input() panelStyleClass: string;
  @Input() panelStyle: NgCssObject;
  @Input() keepInvalid: boolean = false;
  @Input() hideOnDateTimeSelect: boolean = true;
  @Input() touchUI: boolean = false;
  @Input() timeSeparator: string = ':';
  @Input() focusTrap: boolean = true;
  @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';
  @Input() hideTransitionOptions: string = '.1s linear';
  @Input() tabindex: number;
  @Input() variant: NgInputVariant = 'outlined';
  @Input() minDate: Moment;
  @Input() maxDate: Moment;
  @Input() disabledDates: Moment[];
  @Input() disabledDays: number[];
  @Input() yearRange: string;
  @Input() showTime: boolean;
  @Input() responsiveOptions: $CalendarResponsiveOptions[];
  @Input() numberOfMonths: number;
  @Input() firstDayOfWeek: number;
  @Input() locale: $LocaleSettings;
  @Input() view: $CalendarTypeView;
  @Input() defaultDate: Moment;
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();
  @Output() onClose = new EventEmitter<AnimationEvent>();
  @Output() onSelect = new EventEmitter<Moment>();
  @Output() onClear = new EventEmitter<void>();
  @Output() onInput = new EventEmitter<KeyboardEvent>();
  @Output() onTodayClick = new EventEmitter<Moment>();
  @Output() onClearClick = new EventEmitter<Event>();
  @Output() onMonthChange = new EventEmitter<$CalendarMonthChangeEvent>();
  @Output() onYearChange = new EventEmitter<$CalendarYearChangeEvent>();
  @Output() onClickOutside = new EventEmitter<Event>();
  @Output() onShow = new EventEmitter<AnimationEvent>();

  ngControl: NgControl;
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
    this.configService.applyConfigToComponent(this);
  }

  _onInput(event: KeyboardEvent) {
    this.onInput.emit(event);
    this.onModelChange(this.value);
  }

  _onSelect(event: Moment) {
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
