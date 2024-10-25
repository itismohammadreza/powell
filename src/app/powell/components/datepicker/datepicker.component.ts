import {animate, AnimationEvent, state, style, transition, trigger} from '@angular/animations';
import {DOCUMENT} from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  inject,
  Inject,
  Input,
  NgZone,
  numberAttribute,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subscription} from 'rxjs';
import {
  $ConnectedOverlayScrollHandler,
  $DomHandler,
  $Nullable,
  $ObjectUtils,
  $OverlayService,
  $PrimeNGConfig,
  $PrimeTemplate,
  $TranslationKeys,
  $UniqueComponentId,
  $VoidListener,
  $ZIndexUtils
} from '@powell/primeng/api';
import {
  $CalendarMonthChangeEvent,
  $CalendarResponsiveOptions,
  $CalendarTypeView,
  $CalendarYearChangeEvent,
  $LocaleSettings,
  $Month,
  $NavigationState
} from '@powell/primeng/calendar';
import {Moment} from "jalali-moment";
import {MomentService} from "@powell/api";

export interface DateMeta {
  day?: number,
  month?: number,
  year?: number,
  today?: boolean,
  selectable?: boolean,
  otherMonth?: boolean
}

@Component({
  selector: 'ng-datepicker',
  // CHANGES
  templateUrl: './datepicker.component.html',
  // CHANGES
  styleUrl: './datepicker.component.scss',
  animations: [
    trigger('overlayAnimation', [
      state(
        'visibleTouchUI',
        style({
          transform: 'translate(-50%,-50%)',
          opacity: 1
        })
      ),
      transition('void => visible', [style({
        opacity: 0,
        transform: 'scaleY(0.8)'
      }), animate('{{showTransitionParams}}', style({opacity: 1, transform: '*'}))]),
      transition('visible => void', [animate('{{hideTransitionParams}}', style({opacity: 0}))]),
      transition('void => visibleTouchUI', [style({
        opacity: 0,
        transform: 'translate3d(-50%, -40%, 0) scale(0.9)'
      }), animate('{{showTransitionParams}}')]),
      transition('visibleTouchUI => void', [
        animate(
          '{{hideTransitionParams}}',
          style({
            opacity: 0,
            transform: 'translate3d(-50%, -40%, 0) scale(0.9)'
          })
        )
      ])
    ])
  ],
  host: {
    class: 'p-element p-inputwrapper',
    '[class.p-inputwrapper-filled]': 'filled',
    '[class.p-inputwrapper-focus]': 'focus',
    '[class.p-calendar-clearable]': 'showClear && !disabled'
  },
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerComponent),
    multi: true
  }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerComponent implements OnInit, OnDestroy, ControlValueAccessor {
  // CHANGE
  @Input() isJalali: boolean | undefined;
  @Input() iconDisplay: 'input' | 'button' = 'button';
  @Input() style: {[klass: string]: any} | null | undefined;
  @Input() styleClass: string | undefined;
  @Input() inputStyle: {[klass: string]: any} | null | undefined;
  @Input() inputId: string | undefined;
  @Input() name: string | undefined;
  @Input() inputStyleClass: string | undefined;
  @Input() placeholder: string | undefined;
  @Input() ariaLabelledBy: string | undefined;
  @Input() ariaLabel: string | undefined;
  @Input() iconAriaLabel: string | undefined;
  @Input({transform: booleanAttribute}) disabled: boolean | undefined;
  @Input() dateFormat: string | undefined;
  @Input() multipleSeparator: string = ',';
  @Input() rangeSeparator: string = '-';
  @Input({transform: booleanAttribute}) inline: boolean = false;
  @Input({transform: booleanAttribute}) showOtherMonths: boolean = true;
  @Input({transform: booleanAttribute}) selectOtherMonths: boolean | undefined;
  @Input({transform: booleanAttribute}) showIcon: boolean | undefined;
  @Input() icon: string | undefined;
  @Input() appendTo: HTMLElement | ElementRef | TemplateRef<any> | string | null | undefined | any;
  @Input({transform: booleanAttribute}) readonlyInput: boolean | undefined;
  @Input() shortYearCutoff: any = '+10';
  @Input({transform: booleanAttribute}) monthNavigator: boolean | undefined;
  @Input({transform: booleanAttribute}) yearNavigator: boolean | undefined;
  @Input() hourFormat: string = '24';
  @Input({transform: booleanAttribute}) timeOnly: boolean | undefined;
  @Input({transform: numberAttribute}) stepYearPicker: number = 10;
  @Input({transform: numberAttribute}) stepHour: number = 1;
  @Input({transform: numberAttribute}) stepMinute: number = 1;
  @Input({transform: numberAttribute}) stepSecond: number = 1;
  @Input({transform: booleanAttribute}) showSeconds: boolean = false;
  @Input({transform: booleanAttribute}) required: boolean | undefined;
  @Input({transform: booleanAttribute}) showOnFocus: boolean = true;
  @Input({transform: booleanAttribute}) showWeek: boolean = false;
  @Input() startWeekFromFirstDayOfYear: boolean = false;
  @Input({transform: booleanAttribute}) showClear: boolean = false;
  @Input() dataType: string = 'date';
  @Input() selectionMode: 'single' | 'multiple' | 'range' | undefined = 'single';
  @Input() maxDateCount: number | undefined;
  @Input({transform: booleanAttribute}) showButtonBar: boolean | undefined;
  @Input() todayButtonStyleClass: string = 'p-button-text';
  @Input() clearButtonStyleClass: string = 'p-button-text';
  @Input({transform: booleanAttribute}) autofocus: boolean | undefined;
  @Input({transform: booleanAttribute}) autoZIndex: boolean = true;
  @Input({transform: numberAttribute}) baseZIndex: number = 0;
  @Input() panelStyleClass: string | undefined;
  @Input() panelStyle: any;
  @Input({transform: booleanAttribute}) keepInvalid: boolean = false;
  @Input({transform: booleanAttribute}) hideOnDateTimeSelect: boolean = true;
  @Input({transform: booleanAttribute}) touchUI: boolean | undefined;
  @Input() timeSeparator: string = ':';
  @Input({transform: booleanAttribute}) focusTrap: boolean = true;
  @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';
  @Input() hideTransitionOptions: string = '.1s linear';
  @Input({transform: numberAttribute}) tabindex: number | undefined;
  @Input() variant: 'filled' | 'outlined' = 'outlined';

  @Input() get minDate(): Date | Moment | undefined | null {
    return this._minDate;
  }

  set minDate(date: Date | Moment | undefined | null) {
    this._minDate = date;

    if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
      this.createMonths(this.currentMonth, this.currentYear);
    }
  }

  @Input() get maxDate(): Date | Moment | undefined | null {
    return this._maxDate;
  }

  set maxDate(date: Date | Moment | undefined | null) {
    this._maxDate = date;

    if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
      this.createMonths(this.currentMonth, this.currentYear);
    }
  }

  @Input() get disabledDates(): (Date | Moment)[] {
    return this._disabledDates;
  }

  set disabledDates(disabledDates: (Date | Moment)[]) {
    this._disabledDates = disabledDates;
    if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
      this.createMonths(this.currentMonth, this.currentYear);
    }
  }

  @Input() get disabledDays(): number[] {
    return this._disabledDays;
  }

  set disabledDays(disabledDays: number[]) {
    this._disabledDays = disabledDays;

    if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
      this.createMonths(this.currentMonth, this.currentYear);
    }
  }

  @Input() get yearRange(): string {
    return this._yearRange;
  }

  set yearRange(yearRange: string) {
    this._yearRange = yearRange;

    if (yearRange) {
      const years = yearRange.split(':');
      const yearStart = parseInt(years[0]);
      const yearEnd = parseInt(years[1]);

      this.populateYearOptions(yearStart, yearEnd);
    }
  }

  @Input() get showTime(): boolean {
    return this._showTime;
  }

  set showTime(showTime: boolean) {
    this._showTime = showTime;

    if (this.currentHour === undefined) {
      this.initTime(this.value || this.getEqualDateObj());
    }
    this.updateInputfield();
  }

  @Input() get responsiveOptions(): $CalendarResponsiveOptions[] {
    return this._responsiveOptions;
  }

  set responsiveOptions(responsiveOptions: $CalendarResponsiveOptions[]) {
    this._responsiveOptions = responsiveOptions;

    this.destroyResponsiveStyleElement();
    this.createResponsiveStyle();
  }

  @Input() get numberOfMonths(): number {
    return this._numberOfMonths;
  }

  set numberOfMonths(numberOfMonths: number) {
    this._numberOfMonths = numberOfMonths;

    this.destroyResponsiveStyleElement();
    this.createResponsiveStyle();
  }

  @Input() get firstDayOfWeek(): number {
    return this._firstDayOfWeek;
  }

  set firstDayOfWeek(firstDayOfWeek: number) {
    this._firstDayOfWeek = firstDayOfWeek;

    this.createWeekDays();
  }

  @Input() set locale(newLocale: $LocaleSettings) {
    console.warn('Locale property has no effect, use new i18n API instead.');
  }

  @Input() get view(): $CalendarTypeView {
    return this._view;
  }

  set view(view: $CalendarTypeView) {
    this._view = view;
    this.currentView = this._view;
  }

  @Input() get defaultDate(): Date | Moment {
    return this._defaultDate;
  }

  set defaultDate(defaultDate: Date | Moment) {
    this._defaultDate = defaultDate;

    if (this.initialized) {
      const date = defaultDate || this.getEqualDateObj();
      this.currentMonth = date[this.getEqualProp('getMonth')]();
      this.currentYear = date[this.getEqualProp('getFullYear')]();
      this.initTime(date);
      this.createMonths(this.currentMonth, this.currentYear);
    }
  }

  get inputClass() {
    return {
      'p-inputtext p-component': true,
      'p-variant-filled': this.variant === 'filled' || this.config.inputStyle() === 'filled'
    };
  }

  @Output() onFocus: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() onBlur: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() onClose: EventEmitter<AnimationEvent> = new EventEmitter<AnimationEvent>();
  @Output() onSelect: EventEmitter<Date | Moment | (Date | Moment)[]> = new EventEmitter<Date | Moment | (Date | Moment)[]>();
  @Output() onClear: EventEmitter<any> = new EventEmitter<any>();
  @Output() onInput: EventEmitter<any> = new EventEmitter<any>();
  @Output() onTodayClick: EventEmitter<Date | Moment> = new EventEmitter<Date | Moment>();
  @Output() onClearClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() onMonthChange: EventEmitter<$CalendarMonthChangeEvent> = new EventEmitter<$CalendarMonthChangeEvent>();
  @Output() onYearChange: EventEmitter<$CalendarYearChangeEvent> = new EventEmitter<$CalendarYearChangeEvent>();
  @Output() onClickOutside: EventEmitter<any> = new EventEmitter<any>();
  @Output() onShow: EventEmitter<any> = new EventEmitter<any>();
  @ContentChildren($PrimeTemplate) templates!: QueryList<$PrimeTemplate>;
  @ViewChild('container', {static: false}) containerViewChild: $Nullable<ElementRef>;
  @ViewChild('inputfield', {static: false}) inputfieldViewChild: $Nullable<ElementRef>;

  @ViewChild('contentWrapper', {static: false}) set content(content: ElementRef) {
    this.contentViewChild = content;

    if (this.contentViewChild) {
      if (this.isMonthNavigate) {
        Promise.resolve(null).then(() => this.updateFocus());
        this.isMonthNavigate = false;
      } else {
        if (!this.focus && !this.inline) {
          this.initFocusableCell();
        }
      }
    }
  }

  contentViewChild!: ElementRef;
  value: Date | Moment;
  months!: $Month[];
  weekDays: $Nullable<string[]>;
  currentMonth!: number;
  currentYear!: number;
  currentHour: $Nullable<number>;
  currentMinute: $Nullable<number>;
  currentSecond: $Nullable<number>;
  pm: $Nullable<boolean>;
  mask: $Nullable<HTMLDivElement>;
  maskClickListener: $VoidListener;
  overlay: $Nullable<HTMLDivElement>;
  responsiveStyleElement: HTMLStyleElement | undefined | null;
  overlayVisible: $Nullable<boolean>;
  onModelChange: Function = () => {
  };
  onModelTouched: Function = () => {
  };
  timePickerTimer: any;
  documentClickListener: $VoidListener;
  animationEndListener: $VoidListener;
  ticksTo1970: $Nullable<number>;
  yearOptions: $Nullable<number[]>;
  focus: $Nullable<boolean>;
  isKeydown: $Nullable<boolean>;
  filled: $Nullable<boolean>;
  inputFieldValue: $Nullable<string> = null;
  _minDate?: Date | Moment | null;
  _maxDate?: Date | Moment | null;
  _showTime!: boolean;
  _yearRange!: string;
  dateTemplate: $Nullable<TemplateRef<any>>;
  headerTemplate: $Nullable<TemplateRef<any>>;
  footerTemplate: $Nullable<TemplateRef<any>>;
  disabledDateTemplate: $Nullable<TemplateRef<any>>;
  decadeTemplate: $Nullable<TemplateRef<any>>;
  previousIconTemplate: $Nullable<TemplateRef<any>>;
  nextIconTemplate: $Nullable<TemplateRef<any>>;
  triggerIconTemplate: $Nullable<TemplateRef<any>>;
  clearIconTemplate: $Nullable<TemplateRef<any>>;
  decrementIconTemplate: $Nullable<TemplateRef<any>>;
  incrementIconTemplate: $Nullable<TemplateRef<any>>;
  inputIconTemplate: $Nullable<TemplateRef<any>>;
  _disabledDates!: Array<Date | Moment>;
  _disabledDays!: Array<number>;
  scrollHandler: $Nullable<$ConnectedOverlayScrollHandler>;
  documentResizeListener: $VoidListener;
  navigationState: $Nullable<$NavigationState> = null;
  isMonthNavigate: $Nullable<boolean>;
  initialized: $Nullable<boolean>;
  translationSubscription: $Nullable<Subscription>;
  _locale!: $LocaleSettings;
  _responsiveOptions!: $CalendarResponsiveOptions[];
  currentView: $Nullable<string>;
  attributeSelector: $Nullable<string>;
  panelId: $Nullable<string>;
  _numberOfMonths: number = 1;
  _firstDayOfWeek!: number;
  _view: $CalendarTypeView = 'date';
  preventFocus: $Nullable<boolean>;
  _defaultDate!: Date | Moment;
  _focusKey: $Nullable<string> = null;
  private window: Window;

  get locale() {
    return this._locale;
  }

  get iconButtonAriaLabel() {
    return this.iconAriaLabel ? this.iconAriaLabel : this.getTranslation('chooseDate');
  }

  get prevIconAriaLabel() {
    return this.currentView === 'year' ? this.getTranslation('prevDecade') : this.currentView === 'month' ? this.getTranslation('prevYear') : this.getTranslation('prevMonth');
  }

  get nextIconAriaLabel() {
    return this.currentView === 'year' ? this.getTranslation('nextDecade') : this.currentView === 'month' ? this.getTranslation('nextYear') : this.getTranslation('nextMonth');
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public el: ElementRef,
    public renderer: Renderer2,
    public cd: ChangeDetectorRef,
    private zone: NgZone,
    private config: $PrimeNGConfig,
    public overlayService: $OverlayService
  ) {
    this.window = this.document.defaultView as Window;
  }

  // CHANGES
  private momentService = inject(MomentService);

  getEqualProp(key: keyof Date) {
    const result = {
      getFullYear: 'jYear',
      setFullYear: 'jYear',
      getMonth: 'jMonth',
      setMonth: 'jMonth',
      getDate: 'jDate',
      setDate: 'jDate',
      getDay: 'jDay',
      getHours: 'hours',
      getMinutes: 'minutes',
      getSeconds: 'seconds',
      setHours: 'hours',
      setMinutes: 'minutes',
      setSeconds: 'seconds',
      getTime: 'unix',
      toDateString: 'toString'
    } as Partial<Record<keyof Date, keyof Moment>>
    return this.isJalali ? result[key] : key;
  }

  getEqualDateObj(input?: string | number | any[], format?: string) {
    if (this.isJalali) {
      return this.momentService.getJalaliMoment(input, format)
    } else {
      if (input) {
        if (Array.isArray(input)) {
          return new Date(input[0], input[1], input[2]);
        } else {
          return new Date(input as any)
        }
      } else {
        return new Date();
      }
    }
  }

  ngOnInit() {
    // CHANGE
    if (this.isJalali) {
      this.config.setTranslation({
        dayNames: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'],
        dayNamesMin: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
        dayNamesShort: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
        monthNames: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
        monthNamesShort: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
      })
    }
    this.attributeSelector = $UniqueComponentId();
    this.panelId = this.attributeSelector + '_panel';
    const date = this.defaultDate || this.getEqualDateObj();
    this.createResponsiveStyle();
    this.currentMonth = date[this.getEqualProp('getMonth')]();
    this.currentYear = date[this.getEqualProp('getFullYear')]();
    this.yearOptions = [];
    this.currentView = this.view;

    if (this.view === 'date') {
      this.createWeekDays();
      this.initTime(date);
      this.createMonths(this.currentMonth, this.currentYear);
      this.ticksTo1970 = ((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000;
    }

    this.translationSubscription = this.config.translationObserver.subscribe(() => {
      this.createWeekDays();
      this.cd.markForCheck();
    });

    this.initialized = true;
  }

  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'date':
          this.dateTemplate = item.template;
          break;

        case 'decade':
          this.decadeTemplate = item.template;
          break;

        case 'disabledDate':
          this.disabledDateTemplate = item.template;
          break;

        case 'header':
          this.headerTemplate = item.template;
          break;

        case 'inputicon':
          this.inputIconTemplate = item.template;
          break;

        case 'previousicon':
          this.previousIconTemplate = item.template;
          break;

        case 'nexticon':
          this.nextIconTemplate = item.template;
          break;

        case 'triggericon':
          this.triggerIconTemplate = item.template;
          break;

        case 'clearicon':
          this.clearIconTemplate = item.template;
          break;

        case 'decrementicon':
          this.decrementIconTemplate = item.template;
          break;

        case 'incrementicon':
          this.incrementIconTemplate = item.template;
          break;

        case 'footer':
          this.footerTemplate = item.template;
          break;

        default:
          this.dateTemplate = item.template;
          break;
      }
    });
  }

  ngAfterViewInit() {
    if (this.inline) {
      this.contentViewChild && this.contentViewChild.nativeElement.setAttribute(this.attributeSelector, '');

      if (!this.disabled && !this.inline) {
        this.initFocusableCell();
        if (this.numberOfMonths === 1) {
          if (this.contentViewChild && this.contentViewChild.nativeElement) {
            this.contentViewChild.nativeElement.style.width = $DomHandler.getOuterWidth(this.containerViewChild?.nativeElement) + 'px';
          }
        }
      }
    }
  }

  getTranslation(option: string) {
    return this.config.getTranslation(option);
  }

  populateYearOptions(start: number, end: number) {
    this.yearOptions = [];

    for (let i = start; i <= end; i++) {
      this.yearOptions.push(i);
    }
  }

  createWeekDays() {
    this.weekDays = [];
    let dayIndex = this.getFirstDateOfWeek();
    let dayLabels = this.getTranslation($TranslationKeys.DAY_NAMES_MIN);
    for (let i = 0; i < 7; i++) {
      this.weekDays.push(dayLabels[dayIndex]);
      dayIndex = dayIndex == 6 ? 0 : ++dayIndex;
    }
  }

  monthPickerValues() {
    let monthPickerValues = [];
    for (let i = 0; i <= 11; i++) {
      monthPickerValues.push(this.config.getTranslation('monthNamesShort')[i]);
    }

    return monthPickerValues;
  }

  yearPickerValues() {
    let yearPickerValues = [];
    let base = <number>this.currentYear - (<number>this.currentYear % this.stepYearPicker);
    for (let i = 0; i < this.stepYearPicker; i++) {
      yearPickerValues.push(base + i);
    }

    return yearPickerValues;
  }

  createMonths(month: number, year: number) {
    this.months = this.months = [];
    for (let i = 0; i < this.numberOfMonths; i++) {
      let m = month + i;
      let y = year;
      if (m > 11) {
        m = (m % 11) - 1;
        y = year + 1;
      }

      this.months.push(this.createMonth(m, y));
    }
  }

  getWeekNumber(date: Date | Moment) {
    let checkDate = this.getEqualDateObj(date[this.getEqualProp('getTime')]());
    if (this.startWeekFromFirstDayOfYear) {
      let firstDayOfWeek: number = +this.getFirstDateOfWeek();
      checkDate[this.getEqualProp('setDate')](checkDate[this.getEqualProp('getDate')]() + 6 + firstDayOfWeek - checkDate[this.getEqualProp('getDay')]());
    } else {
      checkDate[this.getEqualProp('setDate')](checkDate[this.getEqualProp('getDate')]() + 4 - (checkDate[this.getEqualProp('getDay')]() || 7));
    }
    let time = checkDate[this.getEqualProp('getTime')]();
    checkDate[this.getEqualProp('setMonth')](0);
    checkDate[this.getEqualProp('setDate')](1);
    return Math.floor(Math.round((time - checkDate[this.getEqualProp('getTime')]()) / 86400000) / 7) + 1;
  }

  createMonth(month: number, year: number): $Month {
    let dates = [];
    let firstDay = this.getFirstDayOfMonthIndex(month, year);
    let daysLength = this.getDaysCountInMonth(month, year);
    let prevMonthDaysLength = this.getDaysCountInPrevMonth(month, year);
    let dayNo = 1;
    let today = this.getEqualDateObj();
    let weekNumbers = [];
    let monthRows = Math.ceil((daysLength + firstDay) / 7);
    for (let i = 0; i < monthRows; i++) {
      let week = [];

      if (i == 0) {
        for (let j = prevMonthDaysLength - firstDay + 1; j <= prevMonthDaysLength; j++) {
          let prev = this.getPreviousMonthAndYear(month, year);
          week.push({
            day: j,
            month: prev.month,
            year: prev.year,
            otherMonth: true,
            today: this.isToday(today, j, prev.month, prev.year),
            selectable: this.isSelectable(j, prev.month, prev.year, true)
          });
        }

        let remainingDaysLength = 7 - week.length;
        for (let j = 0; j < remainingDaysLength; j++) {
          week.push({
            day: dayNo,
            month: month,
            year: year,
            today: this.isToday(today, dayNo, month, year),
            selectable: this.isSelectable(dayNo, month, year, false)
          });
          dayNo++;
        }
      } else {
        for (let j = 0; j < 7; j++) {
          if (dayNo > daysLength) {
            let next = this.getNextMonthAndYear(month, year);
            week.push({
              day: dayNo - daysLength,
              month: next.month,
              year: next.year,
              otherMonth: true,
              today: this.isToday(today, dayNo - daysLength, next.month, next.year),
              selectable: this.isSelectable(dayNo - daysLength, next.month, next.year, true)
            });
          } else {
            week.push({
              day: dayNo,
              month: month,
              year: year,
              today: this.isToday(today, dayNo, month, year),
              selectable: this.isSelectable(dayNo, month, year, false)
            });
          }

          dayNo++;
        }
      }

      if (this.showWeek) {
        weekNumbers.push(this.getWeekNumber(this.getEqualDateObj([week[0].year, week[0].month, week[0].day])));
      }

      dates.push(week);
    }

    return {
      month: month,
      year: year,
      dates: <any>dates,
      weekNumbers: weekNumbers
    };
  }

  initTime(date: Date | Moment) {
    this.pm = date[this.getEqualProp('getHours')]() > 11;

    if (this.showTime) {
      this.currentMinute = date[this.getEqualProp('getMinutes')]();
      this.currentSecond = date[this.getEqualProp('getSeconds')]();
      this.setCurrentHourPM(date[this.getEqualProp('getHours')]());
    } else if (this.timeOnly) {
      this.currentMinute = 0;
      this.currentHour = 0;
      this.currentSecond = 0;
    }
  }

  navBackward(event: any) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    this.isMonthNavigate = true;

    if (this.currentView === 'month') {
      this.decrementYear();
      setTimeout(() => {
        this.updateFocus();
      }, 1);
    } else if (this.currentView === 'year') {
      this.decrementYearPickerStep();
      setTimeout(() => {
        this.updateFocus();
      }, 1);
    } else {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.decrementYear();
      } else {
        this.currentMonth--;
      }

      this.onMonthChange.emit({month: this.currentMonth + 1, year: this.currentYear});
      this.createMonths(this.currentMonth, this.currentYear);
    }
  }

  navForward(event: any) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    this.isMonthNavigate = true;

    if (this.currentView === 'month') {
      this.incrementYear();
      setTimeout(() => {
        this.updateFocus();
      }, 1);
    } else if (this.currentView === 'year') {
      this.incrementYearPickerStep();
      setTimeout(() => {
        this.updateFocus();
      }, 1);
    } else {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.incrementYear();
      } else {
        this.currentMonth++;
      }

      this.onMonthChange.emit({month: this.currentMonth + 1, year: this.currentYear});
      this.createMonths(this.currentMonth, this.currentYear);
    }
  }

  decrementYear() {
    this.currentYear--;
    let _yearOptions = <number[]>this.yearOptions;

    if (this.yearNavigator && this.currentYear < _yearOptions[0]) {
      let difference = _yearOptions[_yearOptions.length - 1] - _yearOptions[0];
      this.populateYearOptions(_yearOptions[0] - difference, _yearOptions[_yearOptions.length - 1] - difference);
    }
  }

  decrementYearPickerStep() {
    this.currentYear = this.currentYear - this.stepYearPicker;
  }

  incrementYearPickerStep() {
    this.currentYear = this.currentYear + this.stepYearPicker;
  }

  incrementYear() {
    this.currentYear++;
    let _yearOptions = <number[]>this.yearOptions;

    if (this.yearNavigator && this.currentYear > _yearOptions[_yearOptions.length - 1]) {
      let difference = _yearOptions[_yearOptions.length - 1] - _yearOptions[0];
      this.populateYearOptions(_yearOptions[0] + difference, _yearOptions[_yearOptions.length - 1] + difference);
    }
  }

  switchToMonthView(event: Event) {
    this.setCurrentView('month');
    event.preventDefault();
  }

  switchToYearView(event: Event) {
    this.setCurrentView('year');
    event.preventDefault();
  }

  onDateSelect(event: Event, dateMeta: DateMeta) {
    if (this.disabled || !dateMeta.selectable) {
      event.preventDefault();
      return;
    }

    if (this.isMultipleSelection() && this.isSelected(dateMeta)) {
      this.value = (this.value as any).filter((date: Date | Moment, i: number) => {
        return !this.isDateEquals(date, dateMeta);
      }) as any;
      if ((this.value as any).length === 0) {
        this.value = null;
      }
      this.updateModel(this.value);
    } else {
      if (this.shouldSelectDate(dateMeta)) {
        this.selectDate(dateMeta);
      }
    }

    if (this.hideOnDateTimeSelect && (this.isSingleSelection() || (this.isRangeSelection() && this.value[1]))) {
      setTimeout(() => {
        event.preventDefault();
        this.hideOverlay();

        if (this.mask) {
          this.disableModality();
        }

        this.cd.markForCheck();
      }, 150);
    }

    this.updateInputfield();
    event.preventDefault();
  }

  shouldSelectDate(dateMeta: DateMeta) {
    if (this.isMultipleSelection()) {
      return this.maxDateCount != null ? this.maxDateCount > (this.value ? (this.value as any).length : 0) : true;
    } else return true;
  }

  onMonthSelect(event: Event, index: number) {
    if (this.view === 'month') {
      this.onDateSelect(event, {year: this.currentYear, month: index, day: 1, selectable: true});
    } else {
      this.currentMonth = index;
      this.createMonths(this.currentMonth, this.currentYear);
      this.setCurrentView('date');
      this.onMonthChange.emit({month: this.currentMonth + 1, year: this.currentYear});
    }
  }

  onYearSelect(event: Event, year: number) {
    if (this.view === 'year') {
      this.onDateSelect(event, {year: year, month: 0, day: 1, selectable: true});
    } else {
      this.currentYear = year;
      this.setCurrentView('month');
      this.onYearChange.emit({month: this.currentMonth + 1, year: this.currentYear});
    }
  }

  updateInputfield() {
    let formattedValue = '';

    if (this.value) {
      if (this.isSingleSelection()) {
        formattedValue = this.formatDateTime(this.value);
      } else if (this.isMultipleSelection()) {
        for (let i = 0; i < (this.value as any).length; i++) {
          let dateAsString = this.formatDateTime(this.value[i]);
          formattedValue += dateAsString;
          if (i !== (this.value as any).length - 1) {
            formattedValue += this.multipleSeparator + ' ';
          }
        }
      } else if (this.isRangeSelection()) {
        if (this.value && (this.value as any).length) {
          let startDate = this.value[0];
          let endDate = this.value[1];

          formattedValue = this.formatDateTime(startDate);
          if (endDate) {
            formattedValue += ' ' + this.rangeSeparator + ' ' + this.formatDateTime(endDate);
          }
        }
      }
    }

    this.inputFieldValue = formattedValue;
    this.updateFilledState();
    if (this.inputfieldViewChild && this.inputfieldViewChild.nativeElement) {
      this.inputfieldViewChild.nativeElement.value = this.inputFieldValue;
    }
  }

  formatDateTime(date: any) {
    let formattedValue = this.keepInvalid ? date : null;
    const isDateValid = this.isValidDateForTimeConstraints(date);

    if (this.isValidDate(date)) {
      if (this.timeOnly) {
        formattedValue = this.formatTime(date);
      } else {
        formattedValue = this.formatDate(date, this.getDateFormat());
        if (this.showTime) {
          formattedValue += ' ' + this.formatTime(date);
        }
      }
    } else if (this.dataType === 'string') {
      formattedValue = date;
    }
    formattedValue = isDateValid ? formattedValue : '';
    return formattedValue;
  }

  formatDateMetaToDate(dateMeta: DateMeta): Date | Moment {
    if (this.isJalali) {
      return this.momentService.convertToGregorian(`${dateMeta.year}/${dateMeta.month + 1}/${dateMeta.day}`, 'YYYY/MM/DD')
    } else {
      return this.getEqualDateObj([dateMeta.year, dateMeta.month, dateMeta.day]);
    }
  }

  formatDateKey(date: Date | Moment): string {
    return `${date[this.getEqualProp('getFullYear')]()}-${date[this.getEqualProp('getMonth')]()}-${date[this.getEqualProp('getDate')]()}`;
  }

  setCurrentHourPM(hours: number) {
    if (this.hourFormat == '12') {
      this.pm = hours > 11;
      if (hours >= 12) {
        this.currentHour = hours == 12 ? 12 : hours - 12;
      } else {
        this.currentHour = hours == 0 ? 12 : hours;
      }
    } else {
      this.currentHour = hours;
    }
  }

  setCurrentView(currentView: $CalendarTypeView) {
    this.currentView = currentView;
    this.cd.detectChanges();
    this.alignOverlay();
  }

  selectDate(dateMeta: any) {
    let date = this.formatDateMetaToDate(dateMeta);
    if (this.showTime) {
      if (this.hourFormat == '12') {
        if (this.currentHour === 12) date[this.getEqualProp('setHours')](this.pm ? 12 : 0);
        else date[this.getEqualProp('setHours')](this.pm ? <number>this.currentHour + 12 : <number>this.currentHour);
      } else {
        date[this.getEqualProp('setHours')](<number>this.currentHour);
      }

      date[this.getEqualProp('setMinutes')](<number>this.currentMinute);
      date[this.getEqualProp('setSeconds')](<number>this.currentSecond);
    }

    if (this.minDate && (this.isJalali ? ((this.minDate as Moment).isAfter(date)) : (this.minDate > date))) {
      date = this.minDate;
      this.setCurrentHourPM(date[this.getEqualProp('getHours')]());
      this.currentMinute = date[this.getEqualProp('getMinutes')]();
      this.currentSecond = date[this.getEqualProp('getSeconds')]();
    }

    if (this.maxDate && (this.isJalali ? ((this.maxDate as Moment).isBefore(date)) : (this.maxDate < date))) {
      date = this.maxDate;
      this.setCurrentHourPM(date[this.getEqualProp('getHours')]());
      this.currentMinute = date[this.getEqualProp('getMinutes')]();
      this.currentSecond = date[this.getEqualProp('getSeconds')]();
    }

    if (this.isSingleSelection()) {
      this.updateModel(date);
    } else if (this.isMultipleSelection()) {
      this.updateModel(this.value ? [...(this.value as any), date] : [date]);
    } else if (this.isRangeSelection()) {
      if (this.value && (this.value as any).length) {
        let startDate: Date | Moment = this.value[0];
        let endDate: Date | Moment = this.value[1];

        if (!endDate && date[this.getEqualProp('getTime')]() >= startDate[this.getEqualProp('getTime')]()) {
          endDate = date;
        } else {
          startDate = date;
          endDate = null;
        }

        this.updateModel([startDate, endDate]);
      } else {
        this.updateModel([date, null]);
      }
    }
    this.onSelect.emit(date);
  }

  updateModel(value: Date | Moment | (Date | Moment)[] | string) {
    this.value = value as any;
    if (this.dataType == 'date') {
      this.onModelChange(this.value);
    } else if (this.dataType == 'string') {
      if (this.isSingleSelection()) {
        this.onModelChange(this.formatDateTime(this.value));
      } else {
        let stringArrValue = null;
        if (Array.isArray(this.value)) {
          stringArrValue = this.value.map((date: Date | Moment) => this.formatDateTime(date));
        }
        this.onModelChange(stringArrValue);
      }
    }
  }

  getFirstDayOfMonthIndex(month: number, year: number) {
    let day = this.getEqualDateObj();
    day[this.getEqualProp('setDate')](1);
    day[this.getEqualProp('setMonth')](month);
    day[this.getEqualProp('setFullYear')](year);
    let dayIndex = day[this.getEqualProp('getDay')]() + this.getSundayIndex();
    return dayIndex >= 7 ? dayIndex - 7 : dayIndex;
  }

  getDaysCountInMonth(month: number, year: number) {
    if (this.isJalali) {
      return (this.daylightSavingAdjust(this.momentService.getJalaliMoment(`${year}-${month + 1}`, "jYYYY-jMM")) as Moment).jDaysInMonth();
    } else {
      return 32 - (this.daylightSavingAdjust(new Date(year, month, 32)) as Date).getDate();
    }
  }

  getDaysCountInPrevMonth(month: number, year: number) {
    let prev = this.getPreviousMonthAndYear(month, year);
    return this.getDaysCountInMonth(prev.month, prev.year);
  }

  getPreviousMonthAndYear(month: number, year: number) {
    let m: number;
    let y: number;

    if (month === 0) {
      m = 11;
      y = year - 1;
    } else {
      m = month - 1;
      y = year;
    }

    return {month: m, year: y};
  }

  getNextMonthAndYear(month: number, year: number) {
    let m, y;

    if (month === 11) {
      m = 0;
      y = year + 1;
    } else {
      m = month + 1;
      y = year;
    }

    return {month: m, year: y};
  }

  getSundayIndex() {
    let firstDayOfWeek = this.getFirstDateOfWeek();
    return firstDayOfWeek > 0 ? 7 - firstDayOfWeek : 0;
  }

  isSelected(dateMeta: DateMeta): boolean | undefined {
    if (this.value) {
      if (this.isSingleSelection()) {
        return this.isDateEquals(this.value, dateMeta);
      } else if (this.isMultipleSelection()) {
        let selected = false;
        for (let date of (this.value as any)) {
          selected = this.isDateEquals(date, dateMeta);
          if (selected) {
            break;
          }
        }

        return selected;
      } else if (this.isRangeSelection()) {
        if (this.value[1]) return this.isDateEquals(this.value[0], dateMeta) || this.isDateEquals(this.value[1], dateMeta) || this.isDateBetween(this.value[0], this.value[1], dateMeta);
        else return this.isDateEquals(this.value[0], dateMeta);
      }
    } else {
      return false;
    }
  }

  isComparable() {
    return this.value != null && typeof this.value !== 'string';
  }

  isMonthSelected(month: number) {
    if (this.isComparable() && !this.isMultipleSelection()) {
      const [start, end] = (this.isRangeSelection() ? this.value : [this.value, this.value]) as any;
      const selected = this.getEqualDateObj([this.currentYear, month, 1]);
      return selected >= start && selected <= (end ?? start);
    }
    return false;
  }

  isMonthDisabled(month: number, year?: number) {
    const yearToCheck = year ?? this.currentYear;

    for (let day = 1; day < this.getDaysCountInMonth(month, yearToCheck) + 1; day++) {
      if (this.isSelectable(day, month, yearToCheck, false)) {
        return false;
      }
    }
    return true;
  }

  isYearDisabled(year: number) {
    return Array(12)
    .fill(0)
    .every((v, month) => this.isMonthDisabled(month, year));
  }

  isYearSelected(year: number) {
    if (!this.isComparable()) return false;
    if (this.isMultipleSelection()) return false;

    let value = this.isRangeSelection() ? this.value[0] : this.value;
    return value ? value.getFullYear() === year : false;
  }

  isDateEquals(value: Date | Moment, dateMeta: DateMeta) {
    if (value) return value[this.getEqualProp('getDate')]() === dateMeta.day && value[this.getEqualProp('getMonth')]() === dateMeta.month && value[this.getEqualProp('getFullYear')]() === dateMeta.year;
    else return false;
  }

  isDateBetween(start: Date | Moment, end: Date | Moment, dateMeta: DateMeta) {
    let between: boolean = false;
    if (this.isValidDate(start) && this.isValidDate(end)) {
      let date: Date | Moment = this.formatDateMetaToDate(dateMeta);
      return start[this.getEqualProp('getTime')]() <= date[this.getEqualProp('getTime')]() && end[this.getEqualProp('getTime')]() >= date[this.getEqualProp('getTime')]();
    }

    return between;
  }

  isSingleSelection(): boolean {
    return this.selectionMode === 'single';
  }

  isRangeSelection(): boolean {
    return this.selectionMode === 'range';
  }

  isMultipleSelection(): boolean {
    return this.selectionMode === 'multiple';
  }

  isToday(today: Date | Moment, day: number, month: number, year: number): boolean {
    return today[this.getEqualProp('getDate')]() === day && today[this.getEqualProp('getMonth')]() === month && today[this.getEqualProp('getFullYear')]() === year;
  }

  isSelectable(day: any, month: any, year: any, otherMonth: any): boolean {
    let validMin = true;
    let validMax = true;
    let validDate = true;
    let validDay = true;

    if (otherMonth && !this.selectOtherMonths) {
      return false;
    }

    if (this.minDate) {
      if (this.minDate[this.getEqualProp('getFullYear')]() > year) {
        validMin = false;
      } else if (this.minDate[this.getEqualProp('getFullYear')]() === year && this.currentView != 'year') {
        if (this.minDate[this.getEqualProp('getMonth')]() > month) {
          validMin = false;
        } else if (this.minDate[this.getEqualProp('getMonth')]() === month) {
          if (this.minDate[this.getEqualProp('getDate')]() > day) {
            validMin = false;
          }
        }
      }
    }

    if (this.maxDate) {
      if (this.maxDate[this.getEqualProp('getFullYear')]() < year) {
        validMax = false;
      } else if (this.maxDate[this.getEqualProp('getFullYear')]() === year) {
        if (this.maxDate[this.getEqualProp('getMonth')]() < month) {
          validMax = false;
        } else if (this.maxDate[this.getEqualProp('getMonth')]() === month) {
          if (this.maxDate[this.getEqualProp('getDate')]() < day) {
            validMax = false;
          }
        }
      }
    }

    if (this.disabledDates) {
      validDate = !this.isDateDisabled(day, month, year);
    }

    if (this.disabledDays) {
      validDay = !this.isDayDisabled(day, month, year);
    }

    return validMin && validMax && validDate && validDay;
  }

  isDateDisabled(day: number, month: number, year: number): boolean {
    if (this.disabledDates) {
      for (let disabledDate of this.disabledDates) {
        if (disabledDate[this.getEqualProp('getFullYear')]() === year && disabledDate[this.getEqualProp('getMonth')]() === month && disabledDate[this.getEqualProp('getDate')]() === day) {
          return true;
        }
      }
    }

    return false;
  }

  isDayDisabled(day: number, month: number, year: number): boolean {
    if (this.disabledDays) {
      let weekday = this.getEqualDateObj([year, month, day]);
      let weekdayNumber = weekday[this.getEqualProp('getDay')]();
      return this.disabledDays.indexOf(weekdayNumber) !== -1;
    }
    return false;
  }

  onInputFocus(event: Event) {
    this.focus = true;
    if (this.showOnFocus) {
      this.showOverlay();
    }
    this.onFocus.emit(event);
  }

  onInputClick() {
    if (this.showOnFocus && !this.overlayVisible) {
      this.showOverlay();
    }
  }

  onInputBlur(event: Event) {
    this.focus = false;
    this.onBlur.emit(event);
    if (!this.keepInvalid) {
      this.updateInputfield();
    }
    this.onModelTouched();
  }

  onButtonClick(event: Event, inputfield: any = this.inputfieldViewChild?.nativeElement) {
    if (!this.overlayVisible) {
      inputfield.focus();
      this.showOverlay();
    } else {
      this.hideOverlay();
    }
  }

  clear() {
    this.inputFieldValue = null;
    this.value = null;
    this.onModelChange(this.value);
    this.onClear.emit();
  }

  onOverlayClick(event: Event) {
    this.overlayService.add({
      originalEvent: event,
      target: this.el.nativeElement
    });
  }

  getMonthName(index: number) {
    return this.config.getTranslation('monthNames')[index];
  }

  getYear(month: any) {
    return this.currentView === 'month' ? this.currentYear : month.year;
  }

  switchViewButtonDisabled() {
    return this.numberOfMonths > 1 || this.disabled;
  }

  onPrevButtonClick(event: Event) {
    this.navigationState = {backward: true, button: true};
    this.navBackward(event);
  }

  onNextButtonClick(event: Event) {
    this.navigationState = {backward: false, button: true};
    this.navForward(event);
  }

  onContainerButtonKeydown(event: KeyboardEvent) {
    switch (event.which) {
      //tab
      case 9:
        if (!this.inline) {
          this.trapFocus(event);
        }
        if (this.inline) {
          const headerElements = $DomHandler.findSingle(this.containerViewChild?.nativeElement, '.p-datepicker-header');
          const element = event.target;
          if (this.timeOnly) {
            return;
          } else {
            if (element == headerElements.children[headerElements?.children?.length - 1]) {
              this.initFocusableCell();
            }
          }
        }
        break;

      //escape
      case 27:
        this.inputfieldViewChild?.nativeElement.focus();
        this.overlayVisible = false;
        event.preventDefault();
        break;

      default:
        //Noop
        break;
    }
  }

  onInputKeydown(event: any) {
    this.isKeydown = true;
    if (event.keyCode === 40 && this.contentViewChild) {
      this.trapFocus(event);
    } else if (event.keyCode === 27) {
      if (this.overlayVisible) {
        this.inputfieldViewChild?.nativeElement.focus();
        this.overlayVisible = false;
        event.preventDefault();
      }
    } else if (event.keyCode === 13) {
      if (this.overlayVisible) {
        this.overlayVisible = false;
        event.preventDefault();
      }
    } else if (event.keyCode === 9 && this.contentViewChild) {
      $DomHandler.getFocusableElements(this.contentViewChild.nativeElement).forEach((el) => (el.tabIndex = '-1'));
      if (this.overlayVisible) {
        this.overlayVisible = false;
      }
    }
  }

  onDateCellKeydown(event: any, dateMeta: DateMeta, groupIndex: number) {
    const cellContent = event.currentTarget;
    const cell = cellContent.parentElement;
    const currentDate = this.formatDateMetaToDate(dateMeta);
    switch (event.which) {
      //down arrow
      case 40: {
        cellContent.tabIndex = '-1';
        let cellIndex = $DomHandler.index(cell);
        let nextRow = cell.parentElement.nextElementSibling;
        if (nextRow) {
          let focusCell = nextRow.children[cellIndex].children[0];
          if ($DomHandler.hasClass(focusCell, 'p-disabled')) {
            this.navigationState = {backward: false};
            this.navForward(event);
          } else {
            nextRow.children[cellIndex].children[0].tabIndex = '0';
            nextRow.children[cellIndex].children[0].focus();
          }
        } else {
          this.navigationState = {backward: false};
          this.navForward(event);
        }
        event.preventDefault();
        break;
      }

      //up arrow
      case 38: {
        cellContent.tabIndex = '-1';
        let cellIndex = $DomHandler.index(cell);
        let prevRow = cell.parentElement.previousElementSibling;
        if (prevRow) {
          let focusCell = prevRow.children[cellIndex].children[0];
          if ($DomHandler.hasClass(focusCell, 'p-disabled')) {
            this.navigationState = {backward: true};
            this.navBackward(event);
          } else {
            focusCell.tabIndex = '0';
            focusCell.focus();
          }
        } else {
          this.navigationState = {backward: true};
          this.navBackward(event);
        }
        event.preventDefault();
        break;
      }

      //left arrow
      case 37: {
        cellContent.tabIndex = '-1';
        let prevCell = cell.previousElementSibling;
        if (prevCell) {
          let focusCell = prevCell.children[0];
          if ($DomHandler.hasClass(focusCell, 'p-disabled') || $DomHandler.hasClass(focusCell.parentElement, 'p-datepicker-weeknumber')) {
            this.navigateToMonth(true, groupIndex);
          } else {
            focusCell.tabIndex = '0';
            focusCell.focus();
          }
        } else {
          this.navigateToMonth(true, groupIndex);
        }
        event.preventDefault();
        break;
      }

      //right arrow
      case 39: {
        cellContent.tabIndex = '-1';
        let nextCell = cell.nextElementSibling;
        if (nextCell) {
          let focusCell = nextCell.children[0];
          if ($DomHandler.hasClass(focusCell, 'p-disabled')) {
            this.navigateToMonth(false, groupIndex);
          } else {
            focusCell.tabIndex = '0';
            focusCell.focus();
          }
        } else {
          this.navigateToMonth(false, groupIndex);
        }
        event.preventDefault();
        break;
      }

      //enter
      //space
      case 13:
      case 32: {
        this.onDateSelect(event, dateMeta);
        event.preventDefault();
        break;
      }

      //escape
      case 27: {
        this.inputfieldViewChild?.nativeElement.focus();
        this.overlayVisible = false;
        event.preventDefault();
        break;
      }

      //tab
      case 9: {
        if (!this.inline) {
          this.trapFocus(event);
        }
        break;
      }

      // page up
      case 33: {
        cellContent.tabIndex = '-1';
        const dateToFocus = this.getEqualDateObj([currentDate[this.getEqualProp('getFullYear')](), currentDate[this.getEqualProp('getMonth')]() - 1, currentDate[this.getEqualProp('getDate')]()]);
        const focusKey = this.formatDateKey(dateToFocus);
        this.navigateToMonth(true, groupIndex, `span[data-date='${focusKey}']:not(.p-disabled):not(.p-ink)`);
        event.preventDefault();
        break;
      }

      // page down
      case 34: {
        cellContent.tabIndex = '-1';
        const dateToFocus = this.getEqualDateObj([currentDate[this.getEqualProp('getFullYear')](), currentDate[this.getEqualProp('getMonth')]() + 1, currentDate[this.getEqualProp('getDate')]()]);
        const focusKey = this.formatDateKey(dateToFocus);
        this.navigateToMonth(false, groupIndex, `span[data-date='${focusKey}']:not(.p-disabled):not(.p-ink)`);
        event.preventDefault();
        break;
      }

      //home
      case 36:
        cellContent.tabIndex = '-1';
        const firstDayDate = this.getEqualDateObj([currentDate[this.getEqualProp('getFullYear')](), currentDate[this.getEqualProp('getMonth')](), 1]);
        const firstDayDateKey = this.formatDateKey(firstDayDate);
        const firstDayCell = $DomHandler.findSingle(cellContent.offsetParent, `span[data-date='${firstDayDateKey}']:not(.p-disabled):not(.p-ink)`);
        if (firstDayCell) {
          firstDayCell.tabIndex = '0';
          firstDayCell.focus();
        }
        event.preventDefault();
        break;

      //end
      case 35:
        cellContent.tabIndex = '-1';
        const lastDayDate = this.getEqualDateObj([currentDate[this.getEqualProp('getFullYear')](), currentDate[this.getEqualProp('getMonth')]() + 1, 0]);
        const lastDayDateKey = this.formatDateKey(lastDayDate);
        const lastDayCell = $DomHandler.findSingle(cellContent.offsetParent, `span[data-date='${lastDayDateKey}']:not(.p-disabled):not(.p-ink)`);
        if (lastDayDate) {
          lastDayCell.tabIndex = '0';
          lastDayCell.focus();
        }
        event.preventDefault();
        break;

      default:
        //no op
        break;
    }
  }

  onMonthCellKeydown(event: any, index: number) {
    const cell = event.currentTarget;
    switch (event.which) {
      //arrows
      case 38:
      case 40: {
        cell.tabIndex = '-1';
        var cells = cell.parentElement.children;
        var cellIndex = $DomHandler.index(cell);
        let nextCell = cells[event.which === 40 ? cellIndex + 3 : cellIndex - 3];
        if (nextCell) {
          nextCell.tabIndex = '0';
          nextCell.focus();
        }
        event.preventDefault();
        break;
      }

      //left arrow
      case 37: {
        cell.tabIndex = '-1';
        let prevCell = cell.previousElementSibling;
        if (prevCell) {
          prevCell.tabIndex = '0';
          prevCell.focus();
        } else {
          this.navigationState = {backward: true};
          this.navBackward(event);
        }

        event.preventDefault();
        break;
      }

      //right arrow
      case 39: {
        cell.tabIndex = '-1';
        let nextCell = cell.nextElementSibling;
        if (nextCell) {
          nextCell.tabIndex = '0';
          nextCell.focus();
        } else {
          this.navigationState = {backward: false};
          this.navForward(event);
        }

        event.preventDefault();
        break;
      }

      //enter
      //space
      case 13:
      case 32: {
        this.onMonthSelect(event, index);
        event.preventDefault();
        break;
      }

      //escape
      case 27: {
        this.inputfieldViewChild?.nativeElement.focus();
        this.overlayVisible = false;
        event.preventDefault();
        break;
      }

      //tab
      case 9: {
        if (!this.inline) {
          this.trapFocus(event);
        }
        break;
      }

      default:
        //no op
        break;
    }
  }

  onYearCellKeydown(event: any, index: number) {
    const cell = event.currentTarget;

    switch (event.which) {
      //arrows
      case 38:
      case 40: {
        cell.tabIndex = '-1';
        var cells = cell.parentElement.children;
        var cellIndex = $DomHandler.index(cell);
        let nextCell = cells[event.which === 40 ? cellIndex + 2 : cellIndex - 2];
        if (nextCell) {
          nextCell.tabIndex = '0';
          nextCell.focus();
        }
        event.preventDefault();
        break;
      }

      //left arrow
      case 37: {
        cell.tabIndex = '-1';
        let prevCell = cell.previousElementSibling;
        if (prevCell) {
          prevCell.tabIndex = '0';
          prevCell.focus();
        } else {
          this.navigationState = {backward: true};
          this.navBackward(event);
        }

        event.preventDefault();
        break;
      }

      //right arrow
      case 39: {
        cell.tabIndex = '-1';
        let nextCell = cell.nextElementSibling;
        if (nextCell) {
          nextCell.tabIndex = '0';
          nextCell.focus();
        } else {
          this.navigationState = {backward: false};
          this.navForward(event);
        }

        event.preventDefault();
        break;
      }

      //enter
      //space
      case 13:
      case 32: {
        this.onYearSelect(event, index);
        event.preventDefault();
        break;
      }

      //escape
      case 27: {
        this.inputfieldViewChild?.nativeElement.focus();
        this.overlayVisible = false;
        event.preventDefault();
        break;
      }

      //tab
      case 9: {
        this.trapFocus(event);
        break;
      }

      default:
        //no op
        break;
    }
  }

  navigateToMonth(prev: boolean, groupIndex: number, focusKey?: string) {
    if (prev) {
      if (this.numberOfMonths === 1 || groupIndex === 0) {
        this.navigationState = {backward: true};
        this._focusKey = focusKey;
        this.navBackward(event);
      } else {
        let prevMonthContainer = this.contentViewChild.nativeElement.children[groupIndex - 1];
        if (focusKey) {
          const firstDayCell = $DomHandler.findSingle(prevMonthContainer, focusKey);
          firstDayCell.tabIndex = '0';
          firstDayCell.focus();
        } else {
          let cells = $DomHandler.find(prevMonthContainer, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
          let focusCell = cells[cells.length - 1];
          focusCell.tabIndex = '0';
          focusCell.focus();
        }
      }
    } else {
      if (this.numberOfMonths === 1 || groupIndex === this.numberOfMonths - 1) {
        this.navigationState = {backward: false};
        this._focusKey = focusKey;
        this.navForward(event);
      } else {
        let nextMonthContainer = this.contentViewChild.nativeElement.children[groupIndex + 1];
        if (focusKey) {
          const firstDayCell = $DomHandler.findSingle(nextMonthContainer, focusKey);
          firstDayCell.tabIndex = '0';
          firstDayCell.focus();
        } else {
          let focusCell = $DomHandler.findSingle(nextMonthContainer, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
          focusCell.tabIndex = '0';
          focusCell.focus();
        }
      }
    }
  }

  updateFocus() {
    let cell;

    if (this.navigationState) {
      if (this.navigationState.button) {
        this.initFocusableCell();

        if (this.navigationState.backward) $DomHandler.findSingle(this.contentViewChild.nativeElement, '.p-datepicker-prev').focus();
        else $DomHandler.findSingle(this.contentViewChild.nativeElement, '.p-datepicker-next')?.focus();
      } else {
        if (this.navigationState.backward) {
          let cells;

          if (this.currentView === 'month') {
            cells = $DomHandler.find(this.contentViewChild.nativeElement, '.p-monthpicker .p-monthpicker-month:not(.p-disabled)');
          } else if (this.currentView === 'year') {
            cells = $DomHandler.find(this.contentViewChild.nativeElement, '.p-yearpicker .p-yearpicker-year:not(.p-disabled)');
          } else {
            cells = $DomHandler.find(this.contentViewChild.nativeElement, this._focusKey || '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
          }

          if (cells && cells.length > 0) {
            cell = cells[cells.length - 1];
          }
        } else {
          if (this.currentView === 'month') {
            cell = $DomHandler.findSingle(this.contentViewChild.nativeElement, '.p-monthpicker .p-monthpicker-month:not(.p-disabled)');
          } else if (this.currentView === 'year') {
            cell = $DomHandler.findSingle(this.contentViewChild.nativeElement, '.p-yearpicker .p-yearpicker-year:not(.p-disabled)');
          } else {
            cell = $DomHandler.findSingle(this.contentViewChild.nativeElement, this._focusKey || '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
          }
        }

        if (cell) {
          cell.tabIndex = '0';
          cell.focus();
        }
      }

      this.navigationState = null;
      this._focusKey = null;
    } else {
      this.initFocusableCell();
    }
    this.alignOverlay();
  }

  initFocusableCell() {
    const contentEl = this.contentViewChild?.nativeElement;
    let cell!: any;

    if (this.currentView === 'month') {
      let cells = $DomHandler.find(contentEl, '.p-monthpicker .p-monthpicker-month:not(.p-disabled)');
      let selectedCell = $DomHandler.findSingle(contentEl, '.p-monthpicker .p-monthpicker-month.p-highlight');
      cells.forEach((cell) => (cell.tabIndex = -1));
      cell = selectedCell || cells[0];

      if (cells.length === 0) {
        let disabledCells = $DomHandler.find(contentEl, '.p-monthpicker .p-monthpicker-month.p-disabled[tabindex = "0"]');
        disabledCells.forEach((cell) => (cell.tabIndex = -1));
      }
    } else if (this.currentView === 'year') {
      let cells = $DomHandler.find(contentEl, '.p-yearpicker .p-yearpicker-year:not(.p-disabled)');
      let selectedCell = $DomHandler.findSingle(contentEl, '.p-yearpicker .p-yearpicker-year.p-highlight');
      cells.forEach((cell) => (cell.tabIndex = -1));
      cell = selectedCell || cells[0];

      if (cells.length === 0) {
        let disabledCells = $DomHandler.find(contentEl, '.p-yearpicker .p-yearpicker-year.p-disabled[tabindex = "0"]');
        disabledCells.forEach((cell) => (cell.tabIndex = -1));
      }
    } else {
      cell = $DomHandler.findSingle(contentEl, 'span.p-highlight');
      if (!cell) {
        let todayCell = $DomHandler.findSingle(contentEl, 'td.p-datepicker-today span:not(.p-disabled):not(.p-ink)');
        if (todayCell) cell = todayCell;
        else cell = $DomHandler.findSingle(contentEl, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
      }
    }

    if (cell) {
      cell.tabIndex = '0';

      if (!this.preventFocus && (!this.navigationState || !this.navigationState.button)) {
        setTimeout(() => {
          if (!this.disabled) {
            cell.focus();
          }
        }, 1);
      }

      this.preventFocus = false;
    }
  }

  trapFocus(event: any) {
    let focusableElements = $DomHandler.getFocusableElements(this.contentViewChild.nativeElement);

    if (focusableElements && focusableElements.length > 0) {
      if (!focusableElements[0].ownerDocument.activeElement) {
        focusableElements[0].focus();
      } else {
        let focusedIndex = focusableElements.indexOf(focusableElements[0].ownerDocument.activeElement);

        if (event.shiftKey) {
          if (focusedIndex == -1 || focusedIndex === 0) {
            if (this.focusTrap) {
              focusableElements[focusableElements.length - 1].focus();
            } else {
              if (focusedIndex === -1) return this.hideOverlay();
              else if (focusedIndex === 0) return;
            }
          } else {
            focusableElements[focusedIndex - 1].focus();
          }
        } else {
          if (focusedIndex == -1) {
            if (this.timeOnly) {
              focusableElements[0].focus();
            } else {
              let spanIndex = 0;

              for (let i = 0; i < focusableElements.length; i++) {
                if (focusableElements[i].tagName === 'SPAN') spanIndex = i;
              }

              focusableElements[spanIndex].focus();
            }
          } else if (focusedIndex === focusableElements.length - 1) {
            if (!this.focusTrap && focusedIndex != -1) return this.hideOverlay();

            focusableElements[0].focus();
          } else {
            focusableElements[focusedIndex + 1].focus();
          }
        }
      }
    }

    event.preventDefault();
  }

  onMonthDropdownChange(m: string) {
    this.currentMonth = parseInt(m);
    this.onMonthChange.emit({month: this.currentMonth + 1, year: this.currentYear});
    this.createMonths(this.currentMonth, this.currentYear);
  }

  onYearDropdownChange(y: string) {
    this.currentYear = parseInt(y);
    this.onYearChange.emit({month: this.currentMonth + 1, year: this.currentYear});
    this.createMonths(this.currentMonth, this.currentYear);
  }

  convertTo24Hour(hours: number, pm: boolean) {
    //@ts-ignore
    if (this.hourFormat == '12') {
      if (hours === 12) {
        return pm ? 12 : 0;
      } else {
        return pm ? hours + 12 : hours;
      }
    }
    return hours;
  }

  constrainTime(hour: number, minute: number, second: number, pm: boolean) {
    let returnTimeTriple: number[] = [hour, minute, second];
    let minHoursExceeds12: boolean;
    let value = this.value;
    const convertedHour = this.convertTo24Hour(hour, pm);
    const isRange = this.isRangeSelection(),
      isMultiple = this.isMultipleSelection(),
      isMultiValue = isRange || isMultiple;

    if (isMultiValue) {
      if (!this.value) {
        this.value = [this.getEqualDateObj(), this.getEqualDateObj()] as any;
      }
      if (isRange) {
        value = this.value[1] || this.value[0];
      }
      if (isMultiple) {
        value = this.value[(this.value as any).length - 1];
      }
    }
    const valueDateString = value ? value[this.getEqualProp('toDateString')]() : null;
    let isMinDate = this.minDate && valueDateString && this.minDate[this.getEqualProp('toDateString')]() === valueDateString;
    let isMaxDate = this.maxDate && valueDateString && this.maxDate[this.getEqualProp('toDateString')]() === valueDateString;

    if (isMinDate) {
      minHoursExceeds12 = this.minDate[this.getEqualProp('getHours')]() >= 12;
    }

    switch (
      true // intentional fall through
      ) {
      // @ts-ignore
      case isMinDate && minHoursExceeds12 && this.minDate[this.getEqualProp('getHours')]() === 12 && this.minDate[this.getEqualProp('getHours')]() > convertedHour:
        returnTimeTriple[0] = 11;
      // @ts-ignore
      case isMinDate && this.minDate[this.getEqualProp('getHours')]() === convertedHour && this.minDate[this.getEqualProp('getMinutes')]() > minute:
        returnTimeTriple[1] = this.minDate[this.getEqualProp('getMinutes')]();
      // @ts-ignore
      case isMinDate && this.minDate[this.getEqualProp('getHours')]() === convertedHour && this.minDate[this.getEqualProp('getMinutes')]() === minute && this.minDate[this.getEqualProp('getSeconds')]() > second:
        returnTimeTriple[2] = this.minDate[this.getEqualProp('getSeconds')]();
        break;
      // @ts-ignore
      case isMinDate && !minHoursExceeds12 && this.minDate[this.getEqualProp('getHours')]() - 1 === convertedHour && this.minDate[this.getEqualProp('getHours')]() > convertedHour:
        returnTimeTriple[0] = 11;
        this.pm = true;
      // @ts-ignore
      case isMinDate && this.minDate[this.getEqualProp('getHours')]() === convertedHour && this.minDate[this.getEqualProp('getMinutes')]() > minute:
        returnTimeTriple[1] = this.minDate[this.getEqualProp('getMinutes')]();
      // @ts-ignore
      case isMinDate && this.minDate[this.getEqualProp('getHours')]() === convertedHour && this.minDate[this.getEqualProp('getMinutes')]() === minute && this.minDate[this.getEqualProp('getSeconds')]() > second:
        returnTimeTriple[2] = this.minDate[this.getEqualProp('getSeconds')]();
        break;

      // @ts-ignore
      case isMinDate && minHoursExceeds12 && this.minDate[this.getEqualProp('getHours')]() > convertedHour && convertedHour !== 12:
        this.setCurrentHourPM(this.minDate[this.getEqualProp('getHours')]());
        returnTimeTriple[0] = this.currentHour;
      // @ts-ignore
      case isMinDate && this.minDate[this.getEqualProp('getHours')]() === convertedHour && this.minDate[this.getEqualProp('getMinutes')]() > minute:
        returnTimeTriple[1] = this.minDate[this.getEqualProp('getMinutes')]();
      // @ts-ignore
      case isMinDate && this.minDate[this.getEqualProp('getHours')]() === convertedHour && this.minDate[this.getEqualProp('getMinutes')]() === minute && this.minDate[this.getEqualProp('getSeconds')]() > second:
        returnTimeTriple[2] = this.minDate[this.getEqualProp('getSeconds')]();
        break;
      // @ts-ignore
      case isMinDate && this.minDate[this.getEqualProp('getHours')]() > convertedHour:
        returnTimeTriple[0] = this.minDate[this.getEqualProp('getHours')]();
      // @ts-ignore
      case isMinDate && this.minDate[this.getEqualProp('getHours')]() === convertedHour && this.minDate[this.getEqualProp('getMinutes')]() > minute:
        returnTimeTriple[1] = this.minDate[this.getEqualProp('getMinutes')]();
      // @ts-ignore
      case isMinDate && this.minDate[this.getEqualProp('getHours')]() === convertedHour && this.minDate[this.getEqualProp('getMinutes')]() === minute && this.minDate[this.getEqualProp('getSeconds')]() > second:
        returnTimeTriple[2] = this.minDate[this.getEqualProp('getSeconds')]();
        break;
      // @ts-ignore
      case isMaxDate && this.maxDate[this.getEqualProp('getHours')]() < convertedHour:
        returnTimeTriple[0] = this.maxDate[this.getEqualProp('getHours')]();
      // @ts-ignore
      case isMaxDate && this.maxDate[this.getEqualProp('getHours')]() === convertedHour && this.maxDate[this.getEqualProp('getMinutes')]() < minute:
        returnTimeTriple[1] = this.maxDate[this.getEqualProp('getMinutes')]();
      // @ts-ignore
      case isMaxDate && this.maxDate[this.getEqualProp('getHours')]() === convertedHour && this.maxDate[this.getEqualProp('getMinutes')]() === minute && this.maxDate[this.getEqualProp('getSeconds')]() < second:
        returnTimeTriple[2] = this.maxDate[this.getEqualProp('getSeconds')]();
        break;
    }

    return returnTimeTriple;
  }

  incrementHour(event: any) {
    const prevHour = this.currentHour ?? 0;
    let newHour = (this.currentHour ?? 0) + this.stepHour;
    let newPM = this.pm;
    if (this.hourFormat == '24') newHour = newHour >= 24 ? newHour - 24 : newHour;
    else if (this.hourFormat == '12') {
      // Before the AM/PM break, now after
      if (prevHour < 12 && newHour > 11) {
        newPM = !this.pm;
      }
      newHour = newHour >= 13 ? newHour - 12 : newHour;
    }
    this.toggleAMPMIfNotMinDate(newPM);
    [this.currentHour, this.currentMinute, this.currentSecond] = this.constrainTime(newHour, this.currentMinute!, this.currentSecond!, newPM!);
    event.preventDefault();
  }

  toggleAMPMIfNotMinDate(newPM: boolean) {
    let value = this.value;

    if ((this.selectionMode == 'range' || this.selectionMode == 'multiple') && Array.isArray(value) && value.length > 0) {
      value = value[value.length - 1];
    }
    const valueDateString = value ? value[this.getEqualProp('toDateString')]() : null;
    let isMinDate = this.minDate && valueDateString && this.minDate[this.getEqualProp('toDateString')]() === valueDateString;
    if (isMinDate && this.minDate[this.getEqualProp('getHours')]() >= 12) {
      this.pm = true;
    } else {
      this.pm = newPM;
    }
  }

  onTimePickerElementMouseDown(event: Event, type: number, direction: number) {
    if (!this.disabled) {
      this.repeat(event, null, type, direction);
      event.preventDefault();
    }
  }

  onTimePickerElementMouseUp(event: Event) {
    if (!this.disabled) {
      this.clearTimePickerTimer();
      this.updateTime();
    }
  }

  onTimePickerElementMouseLeave() {
    if (!this.disabled && this.timePickerTimer) {
      this.clearTimePickerTimer();
      this.updateTime();
    }
  }

  repeat(event: Event | null, interval: number | null, type: number | null, direction: number | null) {
    let i = interval || 500;

    this.clearTimePickerTimer();
    this.timePickerTimer = setTimeout(() => {
      this.repeat(event, 100, type, direction);
      this.cd.markForCheck();
    }, i);

    switch (type) {
      case 0:
        if (direction === 1) this.incrementHour(event);
        else this.decrementHour(event);
        break;

      case 1:
        if (direction === 1) this.incrementMinute(event);
        else this.decrementMinute(event);
        break;

      case 2:
        if (direction === 1) this.incrementSecond(event);
        else this.decrementSecond(event);
        break;
    }

    this.updateInputfield();
  }

  clearTimePickerTimer() {
    if (this.timePickerTimer) {
      clearTimeout(this.timePickerTimer);
      this.timePickerTimer = null;
    }
  }

  decrementHour(event: any) {
    let newHour = (this.currentHour ?? 0) - this.stepHour;
    let newPM = this.pm;
    if (this.hourFormat == '24') newHour = newHour < 0 ? 24 + newHour : newHour;
    else if (this.hourFormat == '12') {
      // If we were at noon/midnight, then switch
      if (this.currentHour === 12) {
        newPM = !this.pm;
      }
      newHour = newHour <= 0 ? 12 + newHour : newHour;
    }
    this.toggleAMPMIfNotMinDate(newPM);
    [this.currentHour, this.currentMinute, this.currentSecond] = this.constrainTime(newHour, this.currentMinute!, this.currentSecond!, newPM!);
    event.preventDefault();
  }

  incrementMinute(event: any) {
    let newMinute = (this.currentMinute ?? 0) + this.stepMinute;
    newMinute = newMinute > 59 ? newMinute - 60 : newMinute;
    [this.currentHour, this.currentMinute, this.currentSecond] = this.constrainTime(this.currentHour, newMinute, this.currentSecond!, this.pm!);
    event.preventDefault();
  }

  decrementMinute(event: any) {
    let newMinute = (this.currentMinute ?? 0) - this.stepMinute;
    newMinute = newMinute < 0 ? 60 + newMinute : newMinute;
    [this.currentHour, this.currentMinute, this.currentSecond] = this.constrainTime(this.currentHour, newMinute, this.currentSecond, this.pm);
    event.preventDefault();
  }

  incrementSecond(event: any) {
    let newSecond = <any>this.currentSecond + this.stepSecond;
    newSecond = newSecond > 59 ? newSecond - 60 : newSecond;
    [this.currentHour, this.currentMinute, this.currentSecond] = this.constrainTime(this.currentHour, this.currentMinute, newSecond, this.pm);
    event.preventDefault();
  }

  decrementSecond(event: any) {
    let newSecond = <any>this.currentSecond - this.stepSecond;
    newSecond = newSecond < 0 ? 60 + newSecond : newSecond;
    [this.currentHour, this.currentMinute, this.currentSecond] = this.constrainTime(this.currentHour, this.currentMinute, newSecond, this.pm);
    event.preventDefault();
  }

  updateTime() {
    let value: Date | Moment | (Date | Moment)[] = this.value;
    if (this.isRangeSelection()) {
      value = this.value[1] || this.value[0];
    }
    if (this.isMultipleSelection()) {
      value = this.value[(this.value as any).length - 1];
    }
    value = value ? this.getEqualDateObj(value as any) : this.getEqualDateObj();
    if (this.hourFormat == '12') {
      if (this.currentHour === 12) value[this.getEqualProp('setHours')](this.pm ? 12 : 0);
      else value[this.getEqualProp('setHours')](this.pm ? <number>this.currentHour + 12 : this.currentHour);
    } else {
      value[this.getEqualProp('setHours')](this.currentHour);
    }

    value[this.getEqualProp('setMinutes')](this.currentMinute);
    value[this.getEqualProp('setSeconds')](this.currentSecond);
    if (this.isRangeSelection()) {
      if (this.value[1]) value = [this.value[0], value];
      else value = [value, null];
    }

    if (this.isMultipleSelection()) {
      value = [...(this.value as any).slice(0, -1), value];
    }

    this.updateModel(value);
    this.onSelect.emit(value as any);
    this.updateInputfield();
  }

  toggleAMPM(event: any) {
    const newPM = !this.pm;
    this.pm = newPM;
    [this.currentHour, this.currentMinute, this.currentSecond] = this.constrainTime(this.currentHour, this.currentMinute, this.currentSecond, newPM);
    this.updateTime();
    event.preventDefault();
  }

  onUserInput(event: KeyboardEvent | any) {
    // IE 11 Workaround for input placeholder : https://github.com/primefaces/primeng/issues/2026
    if (!this.isKeydown) {
      return;
    }
    this.isKeydown = false;

    let val = (<HTMLInputElement>event.target).value;
    try {
      let value = this.parseValueFromString(val);
      if (this.isValidSelection(value)) {
        this.updateModel(value);
        this.updateUI();
      } else if (this.keepInvalid) {
        this.updateModel(value);
      }
    } catch (err) {
      //invalid date
      let value = this.keepInvalid ? val : null;
      this.updateModel(value);
    }

    this.filled = (val != null && val.length) as any;
    this.onInput.emit(event);
  }

  isValidSelection(value: any): boolean {
    if (this.isSingleSelection()) {
      return this.isSelectable(value.getDate(), value.getMonth(), value.getFullYear(), false);
    }
    let isValid = value.every((v: any) => this.isSelectable(v.getDate(), v.getMonth(), v.getFullYear(), false));
    if (isValid && this.isRangeSelection()) {
      isValid = value.length === 1 || (value.length > 1 && value[1] >= value[0]);
    }
    return isValid;
  }

  parseValueFromString(text: string): Date | Date[] | Moment | Moment[] | null {
    if (!text || text.trim().length === 0) {
      return null;
    }

    let value: any;

    if (this.isSingleSelection()) {
      value = this.parseDateTime(text);
    } else if (this.isMultipleSelection()) {
      let tokens = text.split(this.multipleSeparator);
      value = [];
      for (let token of tokens) {
        value.push(this.parseDateTime(token.trim()));
      }
    } else if (this.isRangeSelection()) {
      let tokens = text.split(' ' + this.rangeSeparator + ' ');
      value = [];
      for (let i = 0; i < tokens.length; i++) {
        value[i] = this.parseDateTime(tokens[i].trim());
      }
    }

    return value;
  }

  parseDateTime(text: any): Date | Moment {
    let date: Date | Moment;
    let parts: string[] = text.split(' ');

    if (this.timeOnly) {
      date = this.getEqualDateObj();
      this.populateTime(date, parts[0], parts[1]);
    } else {
      const dateFormat = this.getDateFormat();
      if (this.showTime) {
        let ampm = this.hourFormat == '12' ? parts.pop() : null;
        let timeString = parts.pop();

        date = this.parseDate(parts.join(' '), dateFormat);
        this.populateTime(date, timeString, ampm);
      } else {
        date = this.parseDate(text, dateFormat);
      }
    }

    return date;
  }

  populateTime(value: any, timeString: any, ampm: any) {
    if (this.hourFormat == '12' && !ampm) {
      throw 'Invalid Time';
    }

    this.pm = ampm === 'PM' || ampm === 'pm';
    let time = this.parseTime(timeString);
    value.setHours(time.hour);
    value.setMinutes(time.minute);
    value.setSeconds(time.second);
  }

  isValidDate(date: any) {
    return (this.isJalali ? (this.getEqualDateObj(date) as Moment).isValid() : $ObjectUtils.isDate(date)) && $ObjectUtils.isNotEmpty(date);
  }

  updateUI() {
    let propValue = this.value;
    if (Array.isArray(propValue)) {
      propValue = propValue[1] || propValue[0];
    }

    let val: Date | Moment = this.defaultDate && this.isValidDate(this.defaultDate) && !this.value ? this.defaultDate : propValue && this.isValidDate(propValue) ? propValue : this.getEqualDateObj();

    this.currentMonth = val[this.getEqualProp('getMonth')]();
    this.currentYear = val[this.getEqualProp('getFullYear')]();
    this.createMonths(this.currentMonth, this.currentYear);

    if (this.showTime || this.timeOnly) {
      this.setCurrentHourPM(val[this.getEqualProp('getHours')]());
      this.currentMinute = val[this.getEqualProp('getMinutes')]();
      this.currentSecond = val[this.getEqualProp('getSeconds')]();
    }
  }

  showOverlay() {
    if (!this.overlayVisible) {
      this.updateUI();

      if (!this.touchUI) {
        this.preventFocus = true;
      }

      this.overlayVisible = true;
    }
  }

  hideOverlay() {
    this.inputfieldViewChild?.nativeElement.focus();
    this.overlayVisible = false;
    this.clearTimePickerTimer();

    if (this.touchUI) {
      this.disableModality();
    }

    this.cd.markForCheck();
  }

  toggle() {
    if (!this.inline) {
      if (!this.overlayVisible) {
        this.showOverlay();
        this.inputfieldViewChild?.nativeElement.focus();
      } else {
        this.hideOverlay();
      }
    }
  }

  onOverlayAnimationStart(event: AnimationEvent) {
    switch (event.toState) {
      case 'visible':
      case 'visibleTouchUI':
        if (!this.inline) {
          this.overlay = event.element;
          this.overlay?.setAttribute(this.attributeSelector as string, '');
          this.appendOverlay();
          this.updateFocus();
          if (this.autoZIndex) {
            if (this.touchUI) $ZIndexUtils.set('modal', this.overlay, this.baseZIndex || this.config.zIndex.modal);
            else $ZIndexUtils.set('overlay', this.overlay, this.baseZIndex || this.config.zIndex.overlay);
          }

          this.alignOverlay();
          this.onShow.emit(event);
        }
        break;

      case 'void':
        this.onOverlayHide();
        this.onClose.emit(event);
        break;
    }
  }

  onOverlayAnimationDone(event: AnimationEvent) {
    switch (event.toState) {
      case 'visible':
      case 'visibleTouchUI':
        if (!this.inline) {
          this.bindDocumentClickListener();
          this.bindDocumentResizeListener();
          this.bindScrollListener();
        }
        break;

      case 'void':
        if (this.autoZIndex) {
          $ZIndexUtils.clear(event.element);
        }
        break;
    }
  }

  appendOverlay() {
    if (this.appendTo) {
      if (this.appendTo === 'body') this.document.body.appendChild(<HTMLElement>this.overlay);
      else $DomHandler.appendChild(this.overlay, this.appendTo);
    }
  }

  restoreOverlayAppend() {
    if (this.overlay && this.appendTo) {
      this.el.nativeElement.appendChild(this.overlay);
    }
  }

  alignOverlay() {
    if (this.touchUI) {
      this.enableModality(this.overlay);
    } else if (this.overlay) {
      if (this.appendTo) {
        if (this.view === 'date') {
          if (!this.overlay.style.width) {
            this.overlay.style.width = $DomHandler.getOuterWidth(this.overlay) + 'px';
          }
          if (!this.overlay.style.minWidth) {
            this.overlay.style.minWidth = $DomHandler.getOuterWidth(this.inputfieldViewChild?.nativeElement) + 'px';
          }
        } else {
          if (!this.overlay.style.width) {
            this.overlay.style.width = $DomHandler.getOuterWidth(this.inputfieldViewChild?.nativeElement) + 'px';
          }
        }

        $DomHandler.absolutePosition(this.overlay, this.inputfieldViewChild?.nativeElement);
      } else {
        $DomHandler.relativePosition(this.overlay, this.inputfieldViewChild?.nativeElement);
      }
    }
  }

  enableModality(element: any) {
    if (!this.mask && this.touchUI) {
      this.mask = this.renderer.createElement('div');
      this.renderer.setStyle(this.mask, 'zIndex', String(parseInt(element.style.zIndex) - 1));
      let maskStyleClass = 'p-component-overlay p-datepicker-mask p-datepicker-mask-scrollblocker p-component-overlay p-component-overlay-enter';
      $DomHandler.addMultipleClasses(this.mask, maskStyleClass);

      this.maskClickListener = this.renderer.listen(this.mask, 'click', (event: any) => {
        this.disableModality();
        this.overlayVisible = false;
      });
      this.renderer.appendChild(this.document.body, this.mask);
      $DomHandler.blockBodyScroll();
    }
  }

  disableModality() {
    if (this.mask) {
      $DomHandler.addClass(this.mask, 'p-component-overlay-leave');
      if (!this.animationEndListener) {
        this.animationEndListener = this.renderer.listen(this.mask, 'animationend', this.destroyMask.bind(this));
      }
    }
  }

  destroyMask() {
    if (!this.mask) {
      return;
    }
    this.renderer.removeChild(this.document.body, this.mask);
    let bodyChildren = this.document.body.children;
    let hasBlockerMasks!: boolean;
    for (let i = 0; i < bodyChildren.length; i++) {
      let bodyChild = bodyChildren[i];
      if ($DomHandler.hasClass(bodyChild, 'p-datepicker-mask-scrollblocker')) {
        hasBlockerMasks = true;
        break;
      }
    }

    if (!hasBlockerMasks) {
      $DomHandler.unblockBodyScroll();
    }

    this.unbindAnimationEndListener();
    this.unbindMaskClickListener();
    this.mask = null;
  }

  unbindMaskClickListener() {
    if (this.maskClickListener) {
      this.maskClickListener();
      this.maskClickListener = null;
    }
  }

  unbindAnimationEndListener() {
    if (this.animationEndListener && this.mask) {
      this.animationEndListener();
      this.animationEndListener = null;
    }
  }

  writeValue(value: any): void {
    this.value = value;
    if (this.value && typeof this.value === 'string') {
      try {
        this.value = this.parseValueFromString(this.value) as any;
      } catch {
        if (this.keepInvalid) {
          this.value = value;
        }
      }
    }

    this.updateInputfield();
    this.updateUI();
    this.cd.markForCheck();
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  setDisabledState(val: boolean): void {
    this.disabled = val;
    this.cd.markForCheck();
  }

  getDateFormat() {
    return this.dateFormat || this.getTranslation('dateFormat');
  }

  getFirstDateOfWeek() {
    return this._firstDayOfWeek || this.getTranslation($TranslationKeys.FIRST_DAY_OF_WEEK);
  }

  // Ported from jquery-ui datepicker formatDate
  formatDate(date: Date | Moment, format: any) {
    if (!date) {
      return '';
    }

    let iFormat!: any;
    const lookAhead = (match: string) => {
        const matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
        if (matches) {
          iFormat++;
        }
        return matches;
      },
      formatNumber = (match: string, value: any, len: any) => {
        let num = '' + value;
        if (lookAhead(match)) {
          while (num.length < len) {
            num = '0' + num;
          }
        }
        return num;
      },
      formatName = (match: string, value: any, shortNames: any, longNames: any) => {
        return lookAhead(match) ? longNames[value] : shortNames[value];
      };
    let output = '';
    let literal = false;

    if (date) {
      for (iFormat = 0; iFormat < format.length; iFormat++) {
        if (literal) {
          if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
            literal = false;
          } else {
            output += format.charAt(iFormat);
          }
        } else {
          switch (format.charAt(iFormat)) {
            case 'd':
              output += formatNumber('d', date[this.getEqualProp('getDate')](), 2);
              break;
            case 'D':
              output += formatName('D', date[this.getEqualProp('getDay')](), this.getTranslation($TranslationKeys.DAY_NAMES_SHORT), this.getTranslation($TranslationKeys.DAY_NAMES));
              break;
            case 'o':
              output += formatNumber('o', Math.round(
                  (this.getEqualDateObj([date[this.getEqualProp('getFullYear')](), date[this.getEqualProp('getMonth')](), date[this.getEqualProp('getDate')]()])[this.getEqualProp('getTime')]() - this.getEqualDateObj([date[this.getEqualProp('getFullYear')](), 0, 0])[this.getEqualProp('getTime')]()) / 86400000),
                3);
              break;
            case 'm':
              output += formatNumber('m', date[this.getEqualProp('getMonth')]() + 1, 2);
              break;
            case 'M':
              output += formatName('M', date[this.getEqualProp('getMonth')](), this.getTranslation($TranslationKeys.MONTH_NAMES_SHORT), this.getTranslation($TranslationKeys.MONTH_NAMES));
              break;
            case 'y':
              output += lookAhead('y') ? date[this.getEqualProp('getFullYear')]() : (date[this.getEqualProp('getFullYear')]() % 100 < 10 ? '0' : '') + (date[this.getEqualProp('getFullYear')]() % 100);
              break;
            case '@':
              output += date[this.getEqualProp('getTime')]();
              break;
            case '!':
              output += date[this.getEqualProp('getTime')]() * 10000 + <number>this.ticksTo1970;
              break;
            case "'":
              if (lookAhead("'")) {
                output += "'";
              } else {
                literal = true;
              }
              break;
            default:
              output += format.charAt(iFormat);
          }
        }
      }
    }
    return output;
  }

  formatTime(date: Date | Moment) {
    if (!date) {
      return '';
    }

    let output = '';
    let hours = date[this.getEqualProp('getHours')]();
    let minutes = date[this.getEqualProp('getMinutes')]();
    let seconds = date[this.getEqualProp('getSeconds')]();

    if (this.hourFormat == '12' && hours > 11 && hours != 12) {
      hours -= 12;
    }

    if (this.hourFormat == '12') {
      output += hours === 0 ? 12 : hours < 10 ? '0' + hours : hours;
    } else {
      output += hours < 10 ? '0' + hours : hours;
    }
    output += ':';
    output += minutes < 10 ? '0' + minutes : minutes;

    if (this.showSeconds) {
      output += ':';
      output += seconds < 10 ? '0' + seconds : seconds;
    }

    if (this.hourFormat == '12') {
      output += date[this.getEqualProp('getHours')]() > 11 ? ' PM' : ' AM';
    }

    return output;
  }

  parseTime(value: any) {
    let tokens: string[] = value.split(':');
    let validTokenLength = this.showSeconds ? 3 : 2;

    if (tokens.length !== validTokenLength) {
      throw 'Invalid time';
    }

    let h = parseInt(tokens[0]);
    let m = parseInt(tokens[1]);
    let s = this.showSeconds ? parseInt(tokens[2]) : null;

    if (isNaN(h) || isNaN(m) || h > 23 || m > 59 || (this.hourFormat == '12' && h > 12) || (this.showSeconds && (isNaN(<any>s) || <any>s > 59))) {
      throw 'Invalid time';
    } else {
      if (this.hourFormat == '12') {
        if (h !== 12 && this.pm) {
          h += 12;
        } else if (!this.pm && h === 12) {
          h -= 12;
        }
      }

      return {hour: h, minute: m, second: s};
    }
  }

  // Ported from jquery-ui datepicker parseDate
  parseDate(value: any, format: any) {
    if (format == null || value == null) {
      throw 'Invalid arguments';
    }

    value = typeof value === 'object' ? value.toString() : value + '';
    if (value === '') {
      return null;
    }

    let iFormat!: any,
      dim,
      extra,
      iValue = 0,
      shortYearCutoff = typeof this.shortYearCutoff !== 'string' ? this.shortYearCutoff : (this.getEqualDateObj()[this.getEqualProp('getFullYear')]() % 100) + parseInt(this.shortYearCutoff, 10),
      year = -1,
      month = -1,
      day = -1,
      doy = -1,
      literal = false,
      date: Date | Moment,
      lookAhead = (match: any) => {
        let matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
        if (matches) {
          iFormat++;
        }
        return matches;
      },
      getNumber = (match: any) => {
        let isDoubled = lookAhead(match),
          size = match === '@' ? 14 : match === '!' ? 20 : match === 'y' && isDoubled ? 4 : match === 'o' ? 3 : 2,
          minSize = match === 'y' ? size : 1,
          digits = new RegExp('^\\d{' + minSize + ',' + size + '}'),
          num = value.substring(iValue).match(digits);
        if (!num) {
          throw 'Missing number at position ' + iValue;
        }
        iValue += num[0].length;
        return parseInt(num[0], 10);
      },
      getName = (match: any, shortNames: any, longNames: any) => {
        let index = -1;
        let arr = lookAhead(match) ? longNames : shortNames;
        let names = [];

        for (let i = 0; i < arr.length; i++) {
          names.push([i, arr[i]]);
        }
        names.sort((a, b) => {
          return -(a[1].length - b[1].length);
        });

        for (let i = 0; i < names.length; i++) {
          let name = names[i][1];
          if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
            index = names[i][0];
            iValue += name.length;
            break;
          }
        }

        if (index !== -1) {
          return index + 1;
        } else {
          throw 'Unknown name at position ' + iValue;
        }
      },
      checkLiteral = () => {
        if (value.charAt(iValue) !== format.charAt(iFormat)) {
          throw 'Unexpected literal at position ' + iValue;
        }
        iValue++;
      };

    if (this.view === 'month') {
      day = 1;
    }

    for (iFormat = 0; iFormat < format.length; iFormat++) {
      if (literal) {
        if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
          literal = false;
        } else {
          checkLiteral();
        }
      } else {
        switch (format.charAt(iFormat)) {
          case 'd':
            day = getNumber('d');
            break;
          case 'D':
            getName('D', this.getTranslation($TranslationKeys.DAY_NAMES_SHORT), this.getTranslation($TranslationKeys.DAY_NAMES));
            break;
          case 'o':
            doy = getNumber('o');
            break;
          case 'm':
            month = getNumber('m');
            break;
          case 'M':
            month = getName('M', this.getTranslation($TranslationKeys.MONTH_NAMES_SHORT), this.getTranslation($TranslationKeys.MONTH_NAMES));
            break;
          case 'y':
            year = getNumber('y');
            break;
          case '@':
            date = this.getEqualDateObj(getNumber('@'));
            year = date[this.getEqualProp('getFullYear')]();
            month = date[this.getEqualProp('getMonth')]() + 1;
            day = date[this.getEqualProp('getDate')]();
            break;
          case '!':
            date = this.getEqualDateObj((getNumber('!') - <number>this.ticksTo1970) / 10000);
            year = date[this.getEqualProp('getFullYear')]();
            month = date[this.getEqualProp('getMonth')]() + 1;
            day = date[this.getEqualProp('getDate')]();
            break;
          case "'":
            if (lookAhead("'")) {
              checkLiteral();
            } else {
              literal = true;
            }
            break;
          default:
            checkLiteral();
        }
      }
    }

    if (iValue < value.length) {
      extra = value.substr(iValue);
      if (!/^\s+/.test(extra)) {
        throw 'Extra/unparsed characters found in date: ' + extra;
      }
    }

    if (year === -1) {
      year = this.getEqualDateObj()[this.getEqualProp('getFullYear')]();
    } else if (year < 100) {
      year += this.getEqualDateObj()[this.getEqualProp('getFullYear')]() - (this.getEqualDateObj()[this.getEqualProp('getFullYear')]() % 100) + (year <= shortYearCutoff ? 0 : -100);
    }

    if (doy > -1) {
      month = 1;
      day = doy;
      do {
        dim = this.getDaysCountInMonth(year, month - 1);
        if (day <= dim) {
          break;
        }
        month++;
        day -= dim;
      } while (true);
    }

    if (this.view === 'year') {
      month = month === -1 ? 1 : month;
      day = day === -1 ? 1 : day;
    }

    date = this.daylightSavingAdjust(this.getEqualDateObj([year, month - 1, day]));

    if (date[this.getEqualProp('getFullYear')]() !== year || date[this.getEqualProp('getMonth')]() + 1 !== month || date[this.getEqualProp('getDate')]() !== day) {
      throw 'Invalid date'; // E.g. 31/02/00
    }

    return date;
  }

  daylightSavingAdjust(date: Date | Moment) {
    if (!date) {
      return null;
    }

    date[this.getEqualProp('setHours')](date[this.getEqualProp('getHours')]() > 12 ? date[this.getEqualProp('getHours')]() + 2 : 0);

    return date;
  }

  updateFilledState() {
    this.filled = (this.inputFieldValue && this.inputFieldValue != '') as boolean;
  }

  isValidDateForTimeConstraints(selectedDate: Date | Moment) {
    if (this.keepInvalid) {
      return true; // If we are keeping invalid dates, we don't need to check for time constraints
    }
    return (!this.minDate || selectedDate[this.getEqualProp('getTime')]() >= this.minDate[this.getEqualProp('getTime')]()) && (!this.maxDate || selectedDate[this.getEqualProp('getTime')]() <= this.maxDate[this.getEqualProp('getTime')]());
  }

  onTodayButtonClick(event: any) {
    const date: Date | Moment = this.getEqualDateObj();
    const dateMeta = {
      day: date[this.getEqualProp('getDate')](),
      month: date[this.getEqualProp('getMonth')](),
      year: date[this.getEqualProp('getFullYear')](),
      otherMonth: date[this.getEqualProp('getMonth')]() !== this.currentMonth || date[this.getEqualProp('getFullYear')]() !== this.currentYear,
      today: true,
      selectable: true
    };

    this.createMonths(date[this.getEqualProp('getMonth')](), date[this.getEqualProp('getFullYear')]());
    this.onDateSelect(event, dateMeta);
    this.onTodayClick.emit(date);
  }

  onClearButtonClick(event: any) {
    this.updateModel(null);
    this.updateInputfield();
    this.hideOverlay();
    this.onClearClick.emit(event);
  }

  createResponsiveStyle() {
    if (this.numberOfMonths > 1 && this.responsiveOptions) {
      if (!this.responsiveStyleElement) {
        this.responsiveStyleElement = this.renderer.createElement('style');
        (<HTMLStyleElement>this.responsiveStyleElement).type = 'text/css';
        $DomHandler.setAttribute(this.responsiveStyleElement, 'nonce', this.config?.csp()?.nonce);
        this.renderer.appendChild(this.document.body, this.responsiveStyleElement);
      }

      let innerHTML = '';
      if (this.responsiveOptions) {
        let responsiveOptions = [...this.responsiveOptions].filter((o) => !!(o.breakpoint && o.numMonths)).sort((o1: any, o2: any) => -1 * o1.breakpoint.localeCompare(o2.breakpoint, undefined, {numeric: true}));

        for (let i = 0; i < responsiveOptions.length; i++) {
          let {breakpoint, numMonths} = responsiveOptions[i];
          let styles = `
                        .p-datepicker[${this.attributeSelector}] .p-datepicker-group:nth-child(${numMonths}) .p-datepicker-next {
                            display: inline-flex !important;
                        }
                    `;

          for (let j: number = <number>numMonths; j < this.numberOfMonths; j++) {
            styles += `
                            .p-datepicker[${this.attributeSelector}] .p-datepicker-group:nth-child(${j + 1}) {
                                display: none !important;
                            }
                        `;
          }

          innerHTML += `
                        @media screen and (max-width: ${breakpoint}) {
                            ${styles}
                        }
                    `;
        }
      }

      (<HTMLStyleElement>this.responsiveStyleElement).innerHTML = innerHTML;
    }
  }

  destroyResponsiveStyleElement() {
    if (this.responsiveStyleElement) {
      this.responsiveStyleElement.remove();
      this.responsiveStyleElement = null;
    }
  }

  bindDocumentClickListener() {
    if (!this.documentClickListener) {
      this.zone.runOutsideAngular(() => {
        const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : this.document;

        this.documentClickListener = this.renderer.listen(documentTarget, 'mousedown', (event) => {
          if (this.isOutsideClicked(event) && this.overlayVisible) {
            this.zone.run(() => {
              this.hideOverlay();
              this.onClickOutside.emit(event);

              this.cd.markForCheck();
            });
          }
        });
      });
    }
  }

  unbindDocumentClickListener() {
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
  }

  bindDocumentResizeListener() {
    if (!this.documentResizeListener && !this.touchUI) {
      this.documentResizeListener = this.renderer.listen(this.window, 'resize', this.onWindowResize.bind(this));
    }
  }

  unbindDocumentResizeListener() {
    if (this.documentResizeListener) {
      this.documentResizeListener();
      this.documentResizeListener = null;
    }
  }

  bindScrollListener() {
    if (!this.scrollHandler) {
      this.scrollHandler = new $ConnectedOverlayScrollHandler(this.containerViewChild?.nativeElement, () => {
        if (this.overlayVisible) {
          this.hideOverlay();
        }
      });
    }

    this.scrollHandler.bindScrollListener();
  }

  unbindScrollListener() {
    if (this.scrollHandler) {
      this.scrollHandler.unbindScrollListener();
    }
  }

  isOutsideClicked(event: Event) {
    return !(this.el.nativeElement.isSameNode(event.target) || this.isNavIconClicked(event) || this.el.nativeElement.contains(event.target) || (this.overlay && this.overlay.contains(<Node>event.target)));
  }

  isNavIconClicked(event: Event) {
    return (
      $DomHandler.hasClass(event.target, 'p-datepicker-prev') || $DomHandler.hasClass(event.target, 'p-datepicker-prev-icon') || $DomHandler.hasClass(event.target, 'p-datepicker-next') || $DomHandler.hasClass(event.target, 'p-datepicker-next-icon')
    );
  }

  onWindowResize() {
    if (this.overlayVisible && !$DomHandler.isTouchDevice()) {
      this.hideOverlay();
    }
  }

  onOverlayHide() {
    this.currentView = this.view;

    if (this.mask) {
      this.destroyMask();
    }

    this.unbindDocumentClickListener();
    this.unbindDocumentResizeListener();
    this.unbindScrollListener();
    this.overlay = null;
  }

  ngOnDestroy() {
    if (this.scrollHandler) {
      this.scrollHandler.destroy();
      this.scrollHandler = null;
    }

    if (this.translationSubscription) {
      this.translationSubscription.unsubscribe();
    }

    if (this.overlay && this.autoZIndex) {
      $ZIndexUtils.clear(this.overlay);
    }

    this.destroyResponsiveStyleElement();
    this.clearTimePickerTimer();
    this.restoreOverlayAppend();
    this.onOverlayHide();
  }
}
