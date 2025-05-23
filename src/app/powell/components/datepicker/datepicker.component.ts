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
  NgCssObject,
  NgDatepickerDateType,
  NgDatepickerHourFormat,
  NgDatepickerIconDisplay,
  NgDatepickerSelectionMode,
  NgInputVariant,
  NgLabelPosition,
  NgSize,
  NgValidation
} from "@powell/models";
import {takeUntil} from "rxjs";
import {DestroyService} from "@core/utils";
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
  selector: 'ng-datepicker',
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

  @Input() value: any;
  @Input() label: string;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean;
  @Input() showRequiredStar: boolean;
  @Input() labelPosition: NgLabelPosition;
  @Input() validation: NgValidation;
  @Input() followConfig: boolean;
  @Input() isJalali: boolean;
  @Input() iconDisplay: NgDatepickerIconDisplay = 'button';
  // native properties
  @Input() style: NgCssObject;
  @Input() styleClass: string;
  @Input() inputStyle: NgCssObject;
  @Input() inputId: string = $uuid();
  @Input() name: string;
  @Input() inputStyleClass: string;
  @Input() placeholder: string;
  @Input() ariaLabelledBy: string;
  @Input() ariaLabel: string;
  @Input() iconAriaLabel: string;
  @Input() disabled: boolean;
  @Input() dateFormat: string;
  @Input() multipleSeparator: string = ',';
  @Input() rangeSeparator: string = '-';
  @Input() inline: boolean;
  @Input() showOtherMonths: boolean = true;
  @Input() selectOtherMonths: boolean;
  @Input() showIcon: boolean;
  @Input() fluid: boolean;
  @Input() datepickerIcon: string;
  @Input() appendTo: any;
  @Input() readonlyInput: boolean;
  @Input() shortYearCutoff: string = '+10';
  @Input() hourFormat: NgDatepickerHourFormat = '24';
  @Input() timeOnly: boolean;
  @Input() stepHour: number = 1;
  @Input() stepMinute: number = 1;
  @Input() stepSecond: number = 1;
  @Input() showSeconds: boolean;
  @Input() required: boolean;
  @Input() showOnFocus: boolean = true;
  @Input() showWeek: boolean;
  @Input() startWeekFromFirstDayOfYear: boolean;
  @Input() showClear: boolean;
  @Input() dataType: NgDatepickerDateType = 'date';
  @Input() selectionMode: NgDatepickerSelectionMode = 'single';
  @Input() maxDateCount: number;
  @Input() showButtonBar: boolean;
  @Input() todayButtonStyleClass: string = 'p-button-text';
  @Input() clearButtonStyleClass: string = 'p-button-text';
  @Input() autofocus: boolean;
  @Input() autoZIndex: boolean = true;
  @Input() baseZIndex: number = 0;
  @Input() panelStyleClass: string;
  @Input() panelStyle: NgCssObject;
  @Input() keepInvalid: boolean;
  @Input() hideOnDateTimeSelect: boolean = true;
  @Input() touchUI: boolean;
  @Input() timeSeparator: string = ':';
  @Input() focusTrap: boolean = true;
  @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';
  @Input() hideTransitionOptions: string = '.1s linear';
  @Input() tabindex: number;
  @Input() variant: NgInputVariant = 'outlined';
  @Input() size: NgSize;
  @Input() minDate: Date | Moment;
  @Input() maxDate: Date | Moment;
  @Input() disabledDates: (Date | Moment)[];
  @Input() disabledDays: number[];
  @Input() showTime: boolean;
  @Input() responsiveOptions: $DatePickerResponsiveOptions[];
  @Input() numberOfMonths: number = 1;
  @Input() firstDayOfWeek: number;
  @Input() view: $DatePickerTypeView = 'date';
  @Input() defaultDate: Date | Moment;
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
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  templateMap: Record<string, TemplateRef<any>> = {};
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
    this.configService.configureComponent(this);
  }

  ngAfterContentInit() {
    this.templates.forEach(item => {
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
