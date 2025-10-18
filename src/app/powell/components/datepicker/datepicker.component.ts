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
} from "@angular/forms";
import {
  CssObject,
  DatepickerDateType,
  DatepickerHourFormat,
  DatepickerIconDisplay,
  DatepickerSelectionMode,
  InputVariant,
  LabelPosition,
  Size,
  Validation
} from "@powell/models";
import {takeUntil} from "rxjs";
import {DestroyService} from "@powell/utils";
import {
  $DatePickerMonthChangeEvent,
  $DatePickerResponsiveOptions,
  $DatePickerTypeView,
  $DatePickerYearChangeEvent,
  $uuid
} from "@powell/primeng";
import {ConfigService} from "@powell/api";
import {Moment} from "jalali-moment";
import {TemplateDirective} from "@powell/directives/template";

@Component({
  selector: 'pw-datepicker',
  templateUrl: './datepicker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true,
    },
    DestroyService
  ],
  standalone: false
})
export class DatepickerComponent implements OnInit, AfterContentInit, ControlValueAccessor {
  private cd = inject(ChangeDetectorRef);
  private injector = inject(Injector);
  private configService = inject(ConfigService);
  private destroy$ = inject(DestroyService);

  @Input() value: Optional<SafeAny>;
  @Input() label: Optional<string>;
  @Input() labelWidth: Optional<number>;
  @Input() hint: Optional<string>;
  @Input() rtl: boolean = false;
  @Input() showRequiredStar: boolean = false;
  @Input() labelPosition: Optional<LabelPosition>;
  @Input() validation: Optional<Validation>;
  @Input() followConfig: boolean = false;
  @Input() isJalali: boolean = false;
  // native properties
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() name: Optional<string>;
  @Input() fluid: boolean = false;
  @Input() variant: Optional<InputVariant>;
  @Input() size: Optional<Size>;
  @Input() inputSize: Optional<number>;
  @Input() pattern: Optional<string>;
  @Input() min: Optional<number>;
  @Input() max: Optional<number>;
  @Input() step: Optional<number>;
  @Input() minlength: Optional<number>;
  @Input() maxlength: Optional<number>;
  @Input() iconDisplay: DatepickerIconDisplay = 'button';
  @Input() inputStyle: Optional<CssObject>;
  @Input() inputId: string = $uuid();
  @Input() inputStyleClass: Optional<string>;
  @Input() placeholder: Optional<string>;
  @Input() ariaLabelledBy: Optional<string>;
  @Input() ariaLabel: Optional<string>;
  @Input() iconAriaLabel: Optional<string>;
  @Input() dateFormat: Optional<string>;
  @Input() multipleSeparator: string = ',';
  @Input() rangeSeparator: string = '-';
  @Input() inline: boolean = false;
  @Input() showOtherMonths: boolean = true;
  @Input() selectOtherMonths: boolean = false;
  @Input() showIcon: boolean = false;
  @Input() icon: Optional<string>;
  @Input() readonlyInput: boolean = false;
  @Input() shortYearCutoff: string = '+10';
  @Input() hourFormat: DatepickerHourFormat = '24';
  @Input() timeOnly: boolean = false;
  @Input() stepHour: number = 1;
  @Input() stepMinute: number = 1;
  @Input() stepSecond: number = 1;
  @Input() showSeconds: boolean = false;
  @Input() showOnFocus: boolean = true;
  @Input() showWeek: boolean = false;
  @Input() startWeekFromFirstDayOfYear: boolean = false;
  @Input() showClear: boolean = false;
  @Input() dataType: DatepickerDateType = 'date';
  @Input() selectionMode: DatepickerSelectionMode = 'single';
  @Input() maxDateCount: Optional<number>;
  @Input() showButtonBar: boolean = false;
  @Input() todayButtonStyleClass: Optional<string>;
  @Input() clearButtonStyleClass: Optional<string>;
  @Input() autofocus: boolean = false;
  @Input() autoZIndex: boolean = true;
  @Input() baseZIndex: number = 0;
  @Input() panelStyleClass: Optional<string>;
  @Input() panelStyle: Optional<CssObject>;
  @Input() keepInvalid: boolean = false;
  @Input() hideOnDateTimeSelect: boolean = true;
  @Input() touchUI: boolean = false;
  @Input() timeSeparator: string = ':';
  @Input() focusTrap: boolean = true;
  @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';
  @Input() hideTransitionOptions: string = '.1s linear';
  @Input() tabindex: Optional<number>;
  @Input() minDate: Optional<Date | Moment>;
  @Input() maxDate: Optional<Date | Moment>;
  @Input() disabledDates: Optional<(Date | Moment)[]>;
  @Input() disabledDays: Optional<number[]>;
  @Input() showTime: boolean = false;
  @Input() responsiveOptions: Optional<$DatePickerResponsiveOptions[]>;
  @Input() numberOfMonths: Optional<number>;
  @Input() firstDayOfWeek: Optional<number>;
  @Input() view: $DatePickerTypeView = 'date';
  @Input() defaultDate: Optional<Date | Moment>;
  @Input() appendTo: Optional<SafeAny>;
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();
  @Output() onClose = new EventEmitter<AnimationEvent>();
  @Output() onSelect = new EventEmitter<Date | Moment | (Date | Moment)[]>();
  @Output() onClear = new EventEmitter<void>();
  @Output() onInput = new EventEmitter<KeyboardEvent>();
  @Output() onTodayClick = new EventEmitter<Date | Moment>();
  @Output() onClearClick = new EventEmitter<Event>();
  @Output() onMonthChange = new EventEmitter<$DatePickerMonthChangeEvent>();
  @Output() onYearChange = new EventEmitter<$DatePickerYearChangeEvent>();
  @Output() onClickOutside = new EventEmitter<Event>();
  @Output() onShow = new EventEmitter<AnimationEvent>();
  @ContentChildren(TemplateDirective) templates: Optional<QueryList<TemplateDirective>>;

  templateMap: Record<string, TemplateRef<SafeAny>> = {};
  ngControl: Nullable<NgControl> = null;
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

  _onInput(event: KeyboardEvent) {
    this.onInput.emit(event);
    this.onModelChange(this.value);
  }

  _onSelect(event: Date | Moment | (Date | Moment)[]) {
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
}
