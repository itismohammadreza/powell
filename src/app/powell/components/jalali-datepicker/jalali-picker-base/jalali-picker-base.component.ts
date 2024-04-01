import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {animate, AnimationEvent, state, style, transition, trigger} from '@angular/animations';
import {Subject, Subscription, takeUntil} from 'rxjs';
import {Moment} from "jalali-moment";
import {MomentService} from "@powell/api";
import {
  PrimeCalendarMonthChangeEvent,
  PrimeCalendarYearChangeEvent,
  PrimeConfig,
  PrimeConnectedOverlayScrollHandler,
  PrimeDomHandler,
  PrimeOverlayService,
  PrimeTemplateDirective,
  PrimeUniqueComponentId,
  PrimeZIndexUtils
} from "@powell/primeng/api";
import {NgCssObject} from "@powell/models";

export interface DateMeta {
  day?: number,
  month?: number,
  year?: number,
  today?: boolean,
  selectable?: boolean,
  otherMonth?: boolean
}

export const CALENDAR_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => JalaliPickerBaseComponent),
  multi: true
};

export interface LocaleSettings {
  firstDayOfWeek?: number;
  dayNames?: string[];
  dayNamesShort?: string[];
  dayNamesMin?: string[];
  monthNames?: string[];
  monthNamesShort?: string[];
  today?: string;
  clear?: string;
  dateFormat?: string;
  weekHeader?: string;
}

export type CalendarTypeView = 'date' | 'month' | 'year';

@Component({
  selector: 'ng-jalali-picker-base',
  templateUrl: './jalali-picker-base.component.html',
  styleUrls: ['./jalali-picker-base.component.scss'],
  animations: [
    trigger('overlayAnimation', [
      state('visibleTouchUI', style({
        transform: 'translate(-50%,-50%)',
        opacity: 1
      })),
      transition('void => visible', [
        style({opacity: 0, transform: 'scaleY(0.8)'}),
        animate('{{showTransitionParams}}', style({opacity: 1, transform: '*'}))
      ]),
      transition('visible => void', [
        animate('{{hideTransitionParams}}', style({opacity: 0}))
      ]),
      transition('void => visibleTouchUI', [
        style({opacity: 0, transform: 'translate3d(-50%, -40%, 0) scale(0.9)'}),
        animate('{{showTransitionParams}}')
      ]),
      transition('visibleTouchUI => void', [
        animate(('{{hideTransitionParams}}'),
          style({
            opacity: 0,
            transform: 'translate3d(-50%, -40%, 0) scale(0.9)'
          }))
      ])
    ])
  ],
  host: {
    'class': 'p-element p-inputwrapper',
    '[class.p-inputwrapper-filled]': 'filled',
    '[class.p-inputwrapper-focus]': 'focus',
    '[class.p-calendar-clearable]': 'showClear && !disabled'
  },
  providers: [CALENDAR_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class JalaliPickerBaseComponent implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor {
  @Input() style: NgCssObject;
  @Input() styleClass: string;
  @Input() inputStyle: NgCssObject;
  @Input() inputId: string;
  @Input() name: string;
  @Input() inputStyleClass: string;
  @Input() placeholder: string;
  @Input() ariaLabelledBy: string;
  @Input() iconAriaLabel: string;
  @Input() disabled: any;
  @Input() dateFormat: string;
  @Input() multipleSeparator: string = ',';
  @Input() rangeSeparator: string = '-';
  @Input() inline: boolean;
  @Input() showOtherMonths: boolean = true;
  @Input() selectOtherMonths: boolean;
  @Input() showIcon: boolean;
  @Input() icon: string = 'pi pi-calendar';
  @Input() appendTo: any;
  @Input() readonlyInput: boolean;
  @Input() shortYearCutoff: any = '+10';
  @Input() monthNavigator: boolean;
  @Input() yearNavigator: boolean;
  @Input() hourFormat: string = '24';
  @Input() timeOnly: boolean;
  @Input() stepHour: number = 1;
  @Input() stepMinute: number = 1;
  @Input() stepSecond: number = 1;
  @Input() showSeconds: boolean;
  @Input() required: boolean;
  @Input() showOnFocus: boolean = true;
  @Input() showWeek: boolean;
  @Input() showClear: boolean;
  @Input() dataType: string = 'date';
  @Input() selectionMode: string = 'single';
  @Input() maxDateCount: number;
  @Input() showButtonBar: boolean;
  @Input() todayButtonStyleClass: string = 'p-button-text';
  @Input() clearButtonStyleClass: string = 'p-button-text';
  @Input() autoZIndex: boolean = true;
  @Input() baseZIndex: number;
  @Input() panelStyleClass: string;
  @Input() panelStyle: NgCssObject;
  @Input() keepInvalid: boolean;
  @Input() hideOnDateTimeSelect: boolean = true;
  @Input() touchUI: boolean;
  @Input() timeSeparator: string = ":";
  @Input() focusTrap: boolean = true;
  @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';
  @Input() hideTransitionOptions: string = '.1s linear';
  @Input() tabindex: number;
  @Input() todayLabel: string = 'امروز';
  @Input() clearLabel: string = 'پاک کردن';
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();
  @Output() onClose = new EventEmitter<AnimationEvent>();
  @Output() onSelect = new EventEmitter<Moment>();
  @Output() onClear = new EventEmitter<void>();
  @Output() onInput = new EventEmitter<KeyboardEvent>();
  @Output() onTodayClick = new EventEmitter<Event>();
  @Output() onClearClick = new EventEmitter<Event>();
  @Output() onMonthChange = new EventEmitter<PrimeCalendarMonthChangeEvent>();
  @Output() onYearChange = new EventEmitter<PrimeCalendarYearChangeEvent>();
  @Output() onClickOutside = new EventEmitter<Event>();
  @Output() onShow = new EventEmitter<AnimationEvent>();
  @ContentChildren(PrimeTemplateDirective) templates: QueryList<any>;
  @ViewChild('container', {static: false}) containerViewChild: ElementRef;
  @ViewChild('inputfield', {static: false}) inputfieldViewChild: ElementRef;

  @ViewChild('contentWrapper', {static: false}) set content(content: ElementRef) {
    this.contentViewChild = content;
    if (this.contentViewChild) {
      if (this.isMonthNavigate) {
        Promise.resolve(null).then(() => this.updateFocus());
        this.isMonthNavigate = false;
      } else {
        if (!this.focus) {
          this.initFocusableCell();
        }
      }
    }
  };

  contentViewChild: ElementRef;
  value: any;
  dates: any[];
  months: any[];
  weekDays: string[];
  currentMonth: number;
  currentYear: number;
  currentHour: number;
  currentMinute: number;
  currentSecond: number;
  pm: boolean;
  mask: HTMLDivElement;
  maskClickListener: Function;
  overlay: HTMLDivElement;
  responsiveStyleElement: any;
  overlayVisible: boolean;
  onModelChange: Function = () => {
  };
  onModelTouched: Function = () => {
  };
  timePickerTimer: any;
  documentClickListener: any;
  animationEndListener: any;
  ticksTo1970: number;
  yearOptions: number[];
  focus: boolean;
  isKeydown: boolean;
  filled: boolean;
  inputFieldValue: string = null;
  _minDate: Moment;
  _maxDate: Moment;
  _showTime: boolean;
  _yearRange: string;
  dateTemplate: TemplateRef<any>;
  headerTemplate: TemplateRef<any>;
  footerTemplate: TemplateRef<any>;
  disabledDateTemplate: TemplateRef<any>;
  decadeTemplate: TemplateRef<any>;
  _disabledDates: Array<Moment>;
  _disabledDays: Array<number>;
  focusElement: any;
  scrollHandler: any;
  documentResizeListener: any;
  navigationState: any = null;
  isMonthNavigate: boolean;
  initialized: boolean;
  translationSubscription: Subscription;
  _locale: LocaleSettings;
  _responsiveOptions: any[];
  currentView: string;
  attributeSelector: string;
  _numberOfMonths: number = 1;
  _firstDayOfWeek: number;
  _view: CalendarTypeView = 'date';
  preventFocus: boolean;
  _defaultDate: Moment;
  monthNames = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
  weekNamesShort = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
  weekNames = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];
  destroy$ = new Subject<boolean>();

  @Input() get view() {
    return this._view;
  };

  set view(view: CalendarTypeView) {
    this._view = view;
    this.currentView = this._view;
  }

  @Input() get defaultDate() {
    return this._defaultDate;
  };

  set defaultDate(defaultDate: Moment) {
    this._defaultDate = defaultDate;
    if (this.initialized) {
      const date = defaultDate || this.getMoment(this.getMoment());
      this.currentMonth = date.jMonth();
      this.currentYear = date.jYear();
      this.initTime(date);
      this.createMonths(this.currentMonth, this.currentYear);
    }
  }

  @Input() get minDate() {
    return this._minDate;
  }

  set minDate(date: Moment) {
    this._minDate = date;

    if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
      this.createMonths(this.currentMonth, this.currentYear);
    }
  }

  @Input() get maxDate() {
    return this._maxDate;
  }

  set maxDate(date: Moment) {
    this._maxDate = date;
    if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
      this.createMonths(this.currentMonth, this.currentYear);
    }
  }

  @Input() get disabledDates() {
    return this._disabledDates;
  }

  set disabledDates(disabledDates: Moment[]) {
    this._disabledDates = disabledDates;
    if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
      this.createMonths(this.currentMonth, this.currentYear);
    }
  }

  @Input() get disabledDays() {
    return this._disabledDays;
  }

  set disabledDays(disabledDays: number[]) {
    this._disabledDays = disabledDays;
    if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
      this.createMonths(this.currentMonth, this.currentYear);
    }
  }

  @Input() get yearRange() {
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

  @Input() get showTime() {
    return this._showTime;
  }

  set showTime(showTime: boolean) {
    this._showTime = showTime;
    if (this.currentHour === undefined) {
      this.initTime(this.value || this.getMoment());
    }
    this.updateInputField();
  }

  get locale() {
    return this._locale;
  }

  @Input() get responsiveOptions() {
    return this._responsiveOptions;
  };

  set responsiveOptions(responsiveOptions: any[]) {
    this._responsiveOptions = responsiveOptions;
    this.destroyResponsiveStyleElement();
    this.createResponsiveStyle();
  }


  @Input() get numberOfMonths() {
    return this._numberOfMonths;
  }

  set numberOfMonths(numberOfMonths: number) {
    this._numberOfMonths = numberOfMonths;
    this.destroyResponsiveStyleElement();
    this.createResponsiveStyle();
  }

  @Input() get firstDayOfWeek() {
    return this._firstDayOfWeek;
  }

  set firstDayOfWeek(firstDayOfWeek: number) {
    this._firstDayOfWeek = firstDayOfWeek;
    this.createWeekDays();
  }

  @Input() set locale(newLocale: LocaleSettings) {
    console.warn("Locale property has no effect, use new i18n API instead.");
  }

  constructor(
    public el: ElementRef,
    public renderer: Renderer2,
    public cd: ChangeDetectorRef,
    private zone: NgZone,
    private config: PrimeConfig,
    public overlayService: PrimeOverlayService,
    private momentService: MomentService) {
  }

  ngOnInit() {
    this.attributeSelector = PrimeUniqueComponentId();
    const date = this.defaultDate || this.getMoment(this.getMoment());
    this.createResponsiveStyle();
    this.currentMonth = date.jMonth()
    this.currentYear = date.jYear();
    this.currentView = this.view;

    if (this.view === 'date') {
      this.createWeekDays();
      this.initTime(date);
      this.createMonths(this.currentMonth, this.currentYear);
      this.ticksTo1970 = (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000);
    }

    this.translationSubscription = this.config.translationObserver.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.createWeekDays();
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

      if (!this.disabled) {
        this.initFocusableCell();
        if (this.numberOfMonths === 1) {
          this.contentViewChild.nativeElement.style.width = PrimeDomHandler.getOuterWidth(this.containerViewChild.nativeElement) + 'px';
        }
      }
    }
  }

  getMoment(input?: any, format?: string) {
    return this.momentService.getJalaliMoment(input, format);
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
    let dayLabels = this.weekNamesShort;
    for (let i = 0; i < 7; i++) {
      this.weekDays.push(dayLabels[dayIndex]);
      dayIndex = (dayIndex == 6) ? 0 : ++dayIndex;
    }
  }

  monthPickerValues() {
    let monthPickerValues = [];
    for (let i = 0; i <= 11; i++) {
      monthPickerValues.push(this.config.getTranslation('monthNamesShort')[i]);
    }
    return this.monthNames;
  }

  yearPickerValues() {
    let yearPickerValues = [];
    let base = this.currentYear - (this.currentYear % 10);
    for (let i = 0; i < 10; i++) {
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
        m = m % 11 - 1;
        y = year + 1;
      }
      this.months.push(this.createMonth(m, y));
    }
  }

  getWeekNumber(date: Moment) {
    let checkDate = this.getMoment(date.unix());
    checkDate.jDate(checkDate.jDate() + 4 - (checkDate.jDay() || 7));
    let time = checkDate.unix();
    checkDate.jMonth(0);
    checkDate.jDate(1);
    return Math.floor(Math.round((time - checkDate.unix()) / 86400000) / 7) + 1;
  }

  createMonth(month: number, year: number) {
    let dates = [];
    let firstDay = this.getFirstDayOfMonthIndex(month, year);
    let daysLength = this.getDaysCountInMonth(month, year);
    let prevMonthDaysLength = this.getDaysCountInPrevMonth(month, year);
    let dayNo = 1;
    let today = this.getMoment();
    let weekNumbers = [];
    let monthRows = Math.ceil((daysLength + firstDay) / 7);
    for (let i = 0; i < monthRows; i++) {
      let week = [];
      if (i == 0) {
        for (let j = (prevMonthDaysLength - firstDay + 1); j <= prevMonthDaysLength; j++) {
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
              day: dayNo - daysLength, month: next.month, year: next.year, otherMonth: true,
              today: this.isToday(today, dayNo - daysLength, next.month, next.year),
              selectable: this.isSelectable((dayNo - daysLength), next.month, next.year, true)
            });
          } else {
            week.push({
              day: dayNo, month: month, year: year, today: this.isToday(today, dayNo, month, year),
              selectable: this.isSelectable(dayNo, month, year, false)
            });
          }
          dayNo++;
        }
      }

      if (this.showWeek) {
        weekNumbers.push(this.getWeekNumber(this.getMoment([week[0].year, week[0].month, week[0].day])));
      }
      dates.push(week);
    }

    return {
      month: month,
      year: year,
      dates: dates,
      weekNumbers: weekNumbers
    };
  }

  initTime(date: Moment) {
    this.pm = date.hours() > 11;
    if (this.showTime) {
      this.currentMinute = date.minutes()
      this.currentSecond = date.seconds();
      this.setCurrentHourPM(date.hours());
    } else if (this.timeOnly) {
      this.currentMinute = 0;
      this.currentHour = 0;
      this.currentSecond = 0;
    }
  }

  navBackward(event: Event) {
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
      this.decrementDecade();
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

  navForward(event: Event) {
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
      this.incrementDecade();
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
    if (this.yearNavigator && this.currentYear < this.yearOptions[0]) {
      let difference = this.yearOptions[this.yearOptions.length - 1] - this.yearOptions[0];
      this.populateYearOptions(this.yearOptions[0] - difference, this.yearOptions[this.yearOptions.length - 1] - difference);
    }
  }

  decrementDecade() {
    this.currentYear = this.currentYear - 10;
  }

  incrementDecade() {
    this.currentYear = this.currentYear + 10;
  }

  incrementYear() {
    this.currentYear++;
    if (this.yearNavigator && this.currentYear > this.yearOptions[this.yearOptions.length - 1]) {
      let difference = this.yearOptions[this.yearOptions.length - 1] - this.yearOptions[0];
      this.populateYearOptions(this.yearOptions[0] + difference, this.yearOptions[this.yearOptions.length - 1] + difference);
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
      this.value = this.value.filter((date, i) => {
        return !this.isDateEquals(date, dateMeta);
      });
      if (this.value.length === 0) {
        this.value = null;
      }
      this.updateModel(this.value);
    } else {
      if (this.shouldSelectDate(dateMeta)) {
        this.selectDate(dateMeta);
      }
    }
    if (this.isSingleSelection() && this.hideOnDateTimeSelect) {
      setTimeout(() => {
        event.preventDefault();
        this.hideOverlay();

        if (this.mask) {
          this.disableModality();
        }

        this.cd.markForCheck();
      }, 150);
    }
    this.updateInputField();
    event.preventDefault();
  }

  shouldSelectDate(dateMeta: DateMeta) {
    if (this.isMultipleSelection())
      return this.maxDateCount != null ? this.maxDateCount > (this.value ? this.value.length : 0) : true;
    else
      return true;
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
      this.onDateSelect(event, {year, month: 0, day: 1, selectable: true});
    } else {
      this.currentYear = year;
      this.setCurrentView('month');
      this.onYearChange.emit({month: this.currentMonth + 1, year: this.currentYear});
    }
  }

  updateInputField() {
    let formattedValue: any = '';
    if (this.value) {
      if (this.isSingleSelection()) {
        formattedValue = this.formatDateTime(this.value);
      } else if (this.isMultipleSelection()) {
        for (let i = 0; i < this.value.length; i++) {
          let dateAsString = this.formatDateTime(this.value[i]);
          formattedValue += dateAsString;
          if (i !== (this.value.length - 1)) {
            formattedValue += this.multipleSeparator + ' ';
          }
        }
      } else if (this.isRangeSelection()) {
        if (this.value && this.value.length) {
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

  formatDateTime(date: Moment) {
    let formattedValue: string = this.keepInvalid ? date.format(this.getDateFormat()) : null;
    if (this.isValidDate(date)) {
      if (this.timeOnly) {
        formattedValue = this.formatTime(date);
      } else {
        formattedValue = this.formatDate(date, this.getDateFormat());
        if (this.showTime) {
          formattedValue += ' ' + this.formatTime(date);
        }
      }
    }
    return formattedValue;
  }

  setCurrentHourPM(hours: number) {
    if (this.hourFormat == '12') {
      this.pm = hours > 11;
      if (hours >= 12) {
        this.currentHour = (hours == 12) ? 12 : hours - 12;
      } else {
        this.currentHour = (hours == 0) ? 12 : hours;
      }
    } else {
      this.currentHour = hours;
    }
  }

  setCurrentView(currentView: CalendarTypeView) {
    this.currentView = currentView;
    this.cd.detectChanges();
    this.alignOverlay();
  }

  selectDate(dateMeta: DateMeta) {
    let date = this.momentService.convertToGregorian(`${dateMeta.year}/${dateMeta.month + 1}/${dateMeta.day}`, 'YYYY/MM/DD')
    if (this.showTime) {
      if (this.hourFormat == '12') {
        if (this.currentHour === 12)
          date.hour(this.pm ? 12 : 0);
        else
          date.hour(this.pm ? this.currentHour + 12 : this.currentHour);
      } else {
        date.hour(this.currentHour);
      }

      date.minute(this.currentMinute);
      date.second(this.currentSecond);
    }

    if (this.minDate && this.minDate.isAfter(date)) {
      date = this.minDate;
      this.setCurrentHourPM(date.hour());
      this.currentMinute = date.minute();
      this.currentSecond = date.second();
    }

    if (this.maxDate && this.maxDate < date) {
      date = this.maxDate;
      this.setCurrentHourPM(date.hour());
      this.currentMinute = date.minute();
      this.currentSecond = date.second();
    }

    if (this.isSingleSelection()) {
      this.updateModel(date);
    } else if (this.isMultipleSelection()) {
      this.updateModel(this.value ? [...this.value, date] : [date]);
    } else if (this.isRangeSelection()) {
      if (this.value && this.value.length) {
        let startDate = this.value[0];
        let endDate = this.value[1];

        if (!endDate && date.unix() >= startDate.unix()) {
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

  updateModel(value: Moment | Moment[]) {
    this.value = value;

    if (this.dataType == 'date') {
      this.onModelChange(this.value);
    } else if (this.dataType == 'string') {
      if (this.isSingleSelection()) {
        this.onModelChange(this.formatDateTime(this.value));
      } else {
        let stringArrValue = null;
        if (this.value) {
          stringArrValue = this.value.map(date => this.formatDateTime(date));
        }
        this.onModelChange(stringArrValue);
      }
    }
  }

  getFirstDayOfMonthIndex(month: number, year: number) {
    let day = this.getMoment();
    day.jDate(1);
    day.jMonth(month);
    day.jYear(year);

    let dayIndex = day.jDay() + this.getSundayIndex();
    return dayIndex >= 7 ? dayIndex - 7 : dayIndex;
  }

  getDaysCountInMonth(month: number, year: number) {
    return this.daylightSavingAdjust(this.getMoment(`${year}-${month + 1}`, "jYYYY-jMM")).jDaysInMonth();
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
    let m: number;
    let y: number;

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
    const firstDayOfWeek = this.getFirstDateOfWeek();
    return firstDayOfWeek > 0 ? 7 - firstDayOfWeek : 0;
  }

  isSelected(dateMeta: DateMeta) {
    if (this.value) {
      if (this.isSingleSelection()) {
        return this.isDateEquals(this.value, dateMeta);
      } else if (this.isMultipleSelection()) {
        let selected = false;
        for (let date of this.value) {
          selected = this.isDateEquals(date, dateMeta);
          if (selected) {
            break;
          }
        }
        return selected;
      } else if (this.isRangeSelection()) {
        if (this.value[1])
          return this.isDateEquals(this.value[0], dateMeta) || this.isDateEquals(this.value[1], dateMeta) || this.isDateBetween(this.value[0], this.value[1], dateMeta);
        else
          return this.isDateEquals(this.value[0], dateMeta)
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
      const [start, end] = this.isRangeSelection() ? this.value : [this.value, this.value];
      const selected = this.getMoment([this.currentYear, month, 1]);
      return selected.isSameOrAfter(start) && selected.isSameOrBefore(end ?? start);
    }
    return false;
  }

  isMonthDisabled(month: number) {
    return !this.isSelectable(1, month, this.currentYear, false)
  }

  isYearSelected(year: number) {
    if (this.isComparable()) {
      let value = this.isRangeSelection() ? this.value[0] : this.value;

      return !this.isMultipleSelection() ? (value.jYear() === year) : false;
    }

    return false;
  }

  isDateEquals(value: Moment, dateMeta: DateMeta) {
    if (value)
      return value.jDate() === dateMeta.day && value.jMonth() === dateMeta.month && value.jYear() === dateMeta.year;
    else
      return false;
  }

  isDateBetween(start: Moment, end: Moment, dateMeta: DateMeta) {
    let between: boolean = false;
    if (start && end) {
      let date: Moment = this.getMoment([dateMeta.year, dateMeta.month, dateMeta.day]);
      return start.unix() <= date.unix() && end.unix() >= date.unix();
    }

    return between;
  }

  isSingleSelection() {
    return this.selectionMode === 'single';
  }

  isRangeSelection() {
    return this.selectionMode === 'range';
  }

  isMultipleSelection() {
    return this.selectionMode === 'multiple';
  }

  isToday(today: Moment, day: number, month: number, year: number) {
    return today.jDate() === day && today.jMonth() === month && today.jYear() === year;
  }

  isSelectable(day: number, month: number, year: number, otherMonth: boolean) {
    let validMin = true;
    let validMax = true;
    let validDate = true;
    let validDay = true;

    if (otherMonth && !this.selectOtherMonths) {
      return false;
    }

    if (this.minDate) {
      if (this.minDate.jYear() > year) {
        validMin = false;
      } else if (this.minDate.jYear() === year) {
        if (this.minDate.jMonth() > month) {
          validMin = false;
        } else if (this.minDate.jMonth() === month) {
          if (this.minDate.jDate() > day) {
            validMin = false;
          }
        }
      }
    }

    if (this.maxDate) {
      if (this.maxDate.jYear() < year) {
        validMax = false;
      } else if (this.maxDate.jYear() === year) {
        if (this.maxDate.jMonth() < month) {
          validMax = false;
        } else if (this.maxDate.jMonth() === month) {
          if (this.maxDate.jDate() < day) {
            validMax = false;
          }
        }
      }
    }

    if (this.disabledDates) {
      validDate = !this.isDateDisabled(day, month, year);
    }

    if (this.disabledDays) {
      validDay = !this.isDayDisabled(day, month, year)
    }

    return validMin && validMax && validDate && validDay;
  }

  isDateDisabled(day: number, month: number, year: number) {
    if (this.disabledDates) {
      for (let disabledDate of this.disabledDates) {
        if (disabledDate.jYear() === year && disabledDate.jMonth() === month && disabledDate.jDate() === day) {
          return true;
        }
      }
    }

    return false;
  }

  isDayDisabled(day: number, month: number, year: number) {
    if (this.disabledDays) {
      let weekday = this.getMoment([year, month, day]);
      let weekdayNumber = weekday.jDay();
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
      this.updateInputField();
    }
    this.onModelTouched();
  }

  onButtonClick(event: Event, inputField: HTMLInputElement) {
    if (!this.overlayVisible) {
      inputField.focus();
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
    return this.monthNames[index];
  }

  getYear(month: DateMeta) {
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
        break;

      //escape
      case 27:
        this.overlayVisible = false;
        event.preventDefault();
        break;

      default:
        //Noop
        break;
    }
  }

  onInputKeydown(event: KeyboardEvent) {
    this.isKeydown = true;
    if (event.keyCode === 40 && this.contentViewChild) {
      this.trapFocus(event);
    } else if (event.keyCode === 27) {
      if (this.overlayVisible) {
        this.overlayVisible = false;
        event.preventDefault();
      }
    } else if (event.keyCode === 13) {
      if (this.overlayVisible) {
        this.overlayVisible = false;
        event.preventDefault();
      }
    } else if (event.keyCode === 9 && this.contentViewChild) {
      PrimeDomHandler.getFocusableElements(this.contentViewChild.nativeElement).forEach(el => el.tabIndex = '-1');
      if (this.overlayVisible) {
        this.overlayVisible = false;
      }
    }
  }

  onDateCellKeydown(event: any, date: DateMeta, groupIndex: number) {
    const cellContent = event.currentTarget;
    const cell = cellContent.parentElement;

    switch (event.which) {
      //down arrow
      case 40: {
        cellContent.tabIndex = '-1';
        let cellIndex = PrimeDomHandler.index(cell);
        let nextRow = cell.parentElement.nextElementSibling;
        if (nextRow) {
          let focusCell = nextRow.children[cellIndex].children[0];
          if (PrimeDomHandler.hasClass(focusCell, 'p-disabled')) {
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
        let cellIndex = PrimeDomHandler.index(cell);
        let prevRow = cell.parentElement.previousElementSibling;
        if (prevRow) {
          let focusCell = prevRow.children[cellIndex].children[0];
          if (PrimeDomHandler.hasClass(focusCell, 'p-disabled')) {
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
          if (PrimeDomHandler.hasClass(focusCell, 'p-disabled') || PrimeDomHandler.hasClass(focusCell.parentElement, 'p-datepicker-weeknumber')) {
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
          if (PrimeDomHandler.hasClass(focusCell, 'p-disabled')) {
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
        this.onDateSelect(event, date);
        event.preventDefault();
        break;
      }

      //escape
      case 27: {
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

  onMonthCellKeydown(event: any, index: number) {
    const cell = event.currentTarget;
    switch (event.which) {
      //arrows
      case 38:
      case 40: {
        cell.tabIndex = '-1';
        var cells = cell.parentElement.children;
        var cellIndex = PrimeDomHandler.index(cell);
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
      case 13: {
        this.onMonthSelect(event, index);
        event.preventDefault();
        break;
      }

      //enter
      //space
      case 13:
      case 32: {
        this.overlayVisible = false;
        event.preventDefault();
        break;
      }

      //escape
      case 27: {
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
        var cellIndex = PrimeDomHandler.index(cell);
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

  navigateToMonth(prev: boolean, groupIndex: number) {
    if (prev) {
      if (this.numberOfMonths === 1 || (groupIndex === 0)) {
        this.navigationState = {backward: true};
        this.navBackward(event);
      } else {
        let prevMonthContainer = this.contentViewChild.nativeElement.children[groupIndex - 1];
        let cells = PrimeDomHandler.find(prevMonthContainer, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
        let focusCell = cells[cells.length - 1];
        focusCell.tabIndex = '0';
        focusCell.focus();
      }
    } else {
      if (this.numberOfMonths === 1 || (groupIndex === this.numberOfMonths - 1)) {
        this.navigationState = {backward: false};
        this.navForward(event);
      } else {
        let nextMonthContainer = this.contentViewChild.nativeElement.children[groupIndex + 1];
        let focusCell = PrimeDomHandler.findSingle(nextMonthContainer, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
        focusCell.tabIndex = '0';
        focusCell.focus();
      }
    }
  }

  updateFocus() {
    let cell;

    if (this.navigationState) {
      if (this.navigationState.button) {
        this.initFocusableCell();

        if (this.navigationState.backward)
          PrimeDomHandler.findSingle(this.contentViewChild.nativeElement, '.p-datepicker-prev').focus();
        else
          PrimeDomHandler.findSingle(this.contentViewChild.nativeElement, '.p-datepicker-next').focus();
      } else {
        if (this.navigationState.backward) {
          let cells;

          if (this.currentView === 'month') {
            cells = PrimeDomHandler.find(this.contentViewChild.nativeElement, '.p-monthpicker .p-monthpicker-month:not(.p-disabled)');
          } else if (this.currentView === 'year') {
            cells = PrimeDomHandler.find(this.contentViewChild.nativeElement, '.p-yearpicker .p-yearpicker-year:not(.p-disabled)');
          } else {
            cells = PrimeDomHandler.find(this.contentViewChild.nativeElement, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
          }

          if (cells && cells.length > 0) {
            cell = cells[cells.length - 1];
          }
        } else {
          if (this.currentView === 'month') {
            cell = PrimeDomHandler.findSingle(this.contentViewChild.nativeElement, '.p-monthpicker .p-monthpicker-month:not(.p-disabled)');
          } else if (this.currentView === 'year') {
            cell = PrimeDomHandler.findSingle(this.contentViewChild.nativeElement, '.p-yearpicker .p-yearpicker-year:not(.p-disabled)');
          } else {
            cell = PrimeDomHandler.findSingle(this.contentViewChild.nativeElement, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
          }
        }

        if (cell) {
          cell.tabIndex = '0';
          cell.focus();
        }
      }

      this.navigationState = null;
    } else {
      this.initFocusableCell();
    }
  }

  initFocusableCell() {
    let cell;

    if (this.currentView === 'month') {
      let cells = PrimeDomHandler.find(this.contentViewChild.nativeElement, '.p-monthpicker .p-monthpicker-month:not(.p-disabled)');
      let selectedCell = PrimeDomHandler.findSingle(this.contentViewChild.nativeElement, '.p-monthpicker .p-monthpicker-month.p-highlight');
      cells.forEach(cell => cell.tabIndex = -1);
      cell = selectedCell || cells[0];

      if (cells.length === 0) {
        let disabledCells = PrimeDomHandler.find(this.contentViewChild.nativeElement, '.p-monthpicker .p-monthpicker-month.p-disabled[tabindex = "0"]');
        disabledCells.forEach(cell => cell.tabIndex = -1);
      }
    } else if (this.currentView === 'year') {
      let cells = PrimeDomHandler.find(this.contentViewChild.nativeElement, '.p-yearpicker .p-yearpicker-year:not(.p-disabled)');
      let selectedCell = PrimeDomHandler.findSingle(this.contentViewChild.nativeElement, '.p-yearpicker .p-yearpicker-year.p-highlight');
      cells.forEach(cell => cell.tabIndex = -1);
      cell = selectedCell || cells[0];

      if (cells.length === 0) {
        let disabledCells = PrimeDomHandler.find(this.contentViewChild.nativeElement, '.p-yearpicker .p-yearpicker-year.p-disabled[tabindex = "0"]');
        disabledCells.forEach(cell => cell.tabIndex = -1);
      }
    } else {
      cell = PrimeDomHandler.findSingle(this.contentViewChild.nativeElement, 'span.p-highlight');
      if (!cell) {
        let todayCell = PrimeDomHandler.findSingle(this.contentViewChild.nativeElement, 'td.p-datepicker-today span:not(.p-disabled):not(.p-ink)');
        if (todayCell)
          cell = todayCell;
        else
          cell = PrimeDomHandler.findSingle(this.contentViewChild.nativeElement, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
      }
    }

    if (cell) {
      cell.tabIndex = '0';

      if (!this.preventFocus && (!this.navigationState || !this.navigationState.button)) {
        setTimeout(() => {
          cell.focus();
        }, 1);
      }

      this.preventFocus = false;
    }
  }

  trapFocus(event: KeyboardEvent) {
    let focusableElements = PrimeDomHandler.getFocusableElements(this.contentViewChild.nativeElement);

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
              if (focusedIndex === -1)
                return this.hideOverlay();
              else if (focusedIndex === 0)
                return;
            }
          } else {
            focusableElements[focusedIndex - 1].focus();
          }
        } else {
          if (focusedIndex == -1 || focusedIndex === (focusableElements.length - 1)) {
            if (!this.focusTrap && focusedIndex != -1)
              return this.hideOverlay();
            else
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
    if (this.hourFormat == '12') {
      if (hours === 12) {
        return (pm ? 12 : 0);
      } else {
        return (pm ? hours + 12 : hours);
      }
    }
    return hours;
  }

  validateTime(hour: number, minute: number, second: number, pm: boolean) {
    let value = this.value;
    const convertedHour = this.convertTo24Hour(hour, pm);
    if (this.isRangeSelection()) {
      value = this.value[1] || this.value[0];
    }
    if (this.isMultipleSelection()) {
      value = this.value[this.value.length - 1];
    }
    const valueDateString = value ? value.toDate().toDateString() : null;
    if (this.minDate && valueDateString && this.minDate.toDate().toDateString() === valueDateString) {
      if (this.minDate.hour() > convertedHour) {
        return false;
      }
      if (this.minDate.hour() === convertedHour) {
        if (this.minDate.minute() > minute) {
          return false;
        }
        if (this.minDate.minute() === minute) {
          if (this.minDate.second() > second) {
            return false;
          }
        }
      }
    }

    if (this.maxDate && valueDateString && this.maxDate.toDate().toDateString() === valueDateString) {
      if (this.maxDate.hour() < convertedHour) {
        return false;
      }
      if (this.maxDate.hour() === convertedHour) {
        if (this.maxDate.minute() < minute) {
          return false;
        }
        if (this.maxDate.minute() === minute) {
          if (this.maxDate.second() < second) {
            return false;
          }
        }
      }
    }
    return true;
  }


  incrementHour(event: Event) {
    const prevHour = this.currentHour;
    let newHour = this.currentHour + this.stepHour;
    let newPM = this.pm;

    if (this.hourFormat == '24')
      newHour = (newHour >= 24) ? (newHour - 24) : newHour;
    else if (this.hourFormat == '12') {
      // Before the AM/PM break, now after
      if (prevHour < 12 && newHour > 11) {
        newPM = !this.pm;
      }
      newHour = (newHour >= 13) ? (newHour - 12) : newHour;
    }

    if (this.validateTime(newHour, this.currentMinute, this.currentSecond, newPM)) {
      this.currentHour = newHour;
      this.pm = newPM;
    }
    event.preventDefault();
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

  repeat(event: Event, interval: number, type: number, direction: number) {
    let i = interval || 500;

    this.clearTimePickerTimer();
    this.timePickerTimer = setTimeout(() => {
      this.repeat(event, 100, type, direction);
      this.cd.markForCheck();
    }, i);

    switch (type) {
      case 0:
        if (direction === 1)
          this.incrementHour(event);
        else
          this.decrementHour(event);
        break;

      case 1:
        if (direction === 1)
          this.incrementMinute(event);
        else
          this.decrementMinute(event);
        break;

      case 2:
        if (direction === 1)
          this.incrementSecond(event);
        else
          this.decrementSecond(event);
        break;
    }

    this.updateInputField();
  }

  clearTimePickerTimer() {
    if (this.timePickerTimer) {
      clearTimeout(this.timePickerTimer);
      this.timePickerTimer = null;
    }
  }

  decrementHour(event: Event) {
    let newHour = this.currentHour - this.stepHour;
    let newPM = this.pm

    if (this.hourFormat == '24')
      newHour = (newHour < 0) ? (24 + newHour) : newHour;
    else if (this.hourFormat == '12') {
      // If we were at noon/midnight, then switch
      if (this.currentHour === 12) {
        newPM = !this.pm;
      }
      newHour = (newHour <= 0) ? (12 + newHour) : newHour;
    }

    if (this.validateTime(newHour, this.currentMinute, this.currentSecond, newPM)) {
      this.currentHour = newHour;
      this.pm = newPM;
    }

    event.preventDefault();
  }

  incrementMinute(event: Event) {
    let newMinute = this.currentMinute + this.stepMinute;
    newMinute = (newMinute > 59) ? newMinute - 60 : newMinute;
    if (this.validateTime(this.currentHour, newMinute, this.currentSecond, this.pm)) {
      this.currentMinute = newMinute;
    }

    event.preventDefault();
  }

  decrementMinute(event: Event) {
    let newMinute = this.currentMinute - this.stepMinute;
    newMinute = (newMinute < 0) ? 60 + newMinute : newMinute;
    if (this.validateTime(this.currentHour, newMinute, this.currentSecond, this.pm)) {
      this.currentMinute = newMinute;
    }

    event.preventDefault();
  }

  incrementSecond(event: Event) {
    let newSecond = this.currentSecond + this.stepSecond;
    newSecond = (newSecond > 59) ? newSecond - 60 : newSecond;
    if (this.validateTime(this.currentHour, this.currentMinute, newSecond, this.pm)) {
      this.currentSecond = newSecond;
    }

    event.preventDefault();
  }

  decrementSecond(event: Event) {
    let newSecond = this.currentSecond - this.stepSecond;
    newSecond = (newSecond < 0) ? 60 + newSecond : newSecond;
    if (this.validateTime(this.currentHour, this.currentMinute, newSecond, this.pm)) {
      this.currentSecond = newSecond;
    }

    event.preventDefault();
  }

  updateTime() {
    let value = this.value;
    if (this.isRangeSelection()) {
      value = this.value[1] || this.value[0];
    }
    if (this.isMultipleSelection()) {
      value = this.value[this.value.length - 1];
    }
    value = value || this.getMoment();

    if (this.hourFormat == '12') {
      if (this.currentHour === 12)
        value.hour(this.pm ? 12 : 0);
      else
        value.hour(this.pm ? this.currentHour + 12 : this.currentHour);
    } else {
      value.hour(this.currentHour);
    }

    value.minute(this.currentMinute);
    value.second(this.currentSecond);
    if (this.isRangeSelection()) {
      if (this.value[1])
        value = [this.value[0], value];
      else
        value = [value, null];
    }

    if (this.isMultipleSelection()) {
      value = [...this.value.slice(0, -1), value];
    }

    this.updateModel(value);
    this.onSelect.emit(value);
    this.updateInputField();
  }

  toggleAMPM(event: Event) {
    const newPM = !this.pm;
    if (this.validateTime(this.currentHour, this.currentMinute, this.currentSecond, newPM)) {
      this.pm = newPM;
      this.updateTime();
    }
    event.preventDefault();
  }

  onUserInput(event: any) {
    // IE 11 Workaround for input placeholder : https://github.com/primefaces/primeng/issues/2026
    if (!this.isKeydown) {
      return;
    }
    this.isKeydown = false;

    let val = event.target.value;
    try {
      let value = this.parseValueFromString(val);
      if (this.isValidSelection(value)) {
        this.updateModel(value);
        this.updateUI();
      }
    } catch (err) {
      //invalid date
      let value = this.keepInvalid ? val : null;
      this.updateModel(value);
    }

    this.filled = val != null && val.length;
    this.onInput.emit(event);
  }

  isValidSelection(value: Moment | Moment[]) {
    let isValid = true;
    if (this.isSingleSelection() && !Array.isArray(value)) {
      if (!this.isSelectable(value.jDate(), value.jMonth(), value.jYear(), false)) {
        isValid = false;
      }
    } else if (Array.isArray(value) && value.every(v => this.isSelectable(v.jDate(), v.jMonth(), v.jYear(), false))) {
      if (this.isRangeSelection()) {
        isValid = value.length > 1 && value[1] > value[0] ? true : false;
      }
    }
    return isValid;
  }

  parseValueFromString(text: string) {
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

  parseDateTime(text: string) {
    let date: Moment;
    let parts: string[] = text.split(' ');

    if (this.timeOnly) {
      date = this.getMoment();
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

  populateTime(value: Moment, timeString: string, ampm: string) {
    if (this.hourFormat == '12' && !ampm) {
      throw 'Invalid Time';
    }

    this.pm = (ampm === 'PM' || ampm === 'pm');
    let time = this.parseTime(timeString);
    value.hour(time.hour);
    value.minute(time.minute);
    value.second(time.second);
  }

  isValidDate(date) {
    return this.getMoment(date).isValid();
  }

  updateUI() {
    let propValue = this.value;
    if (Array.isArray(propValue)) {
      propValue = propValue[0];
    }

    let val = this.defaultDate && this.isValidDate(this.defaultDate) && !this.value ? this.defaultDate : (propValue && this.isValidDate(propValue) ? propValue : this.getMoment());

    this.currentMonth = val.jMonth();
    this.currentYear = val.jYear();
    this.createMonths(this.currentMonth, this.currentYear);

    if (this.showTime || this.timeOnly) {
      this.setCurrentHourPM(val.hours());
      this.currentMinute = val.minutes();
      this.currentSecond = val.seconds();
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
        this.inputfieldViewChild.nativeElement.focus();
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
          this.overlay.setAttribute(this.attributeSelector, '');
          this.appendOverlay();
          this.updateFocus();
          if (this.autoZIndex) {
            if (this.touchUI)
              PrimeZIndexUtils.set('modal', this.overlay, this.baseZIndex || this.config.zIndex.modal);
            else
              PrimeZIndexUtils.set('overlay', this.overlay, this.baseZIndex || this.config.zIndex.overlay);
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
          PrimeZIndexUtils.clear(event.element);
        }
        break
    }
  }

  appendOverlay() {
    if (this.appendTo) {
      if (this.appendTo === 'body')
        document.body.appendChild(this.overlay);
      else
        PrimeDomHandler.appendChild(this.overlay, this.appendTo);
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
          this.overlay.style.width = PrimeDomHandler.getOuterWidth(this.overlay) + 'px';
          this.overlay.style.minWidth = PrimeDomHandler.getOuterWidth(this.inputfieldViewChild.nativeElement) + 'px';
        } else {
          this.overlay.style.width = PrimeDomHandler.getOuterWidth(this.inputfieldViewChild.nativeElement) + 'px';
        }

        PrimeDomHandler.absolutePosition(this.overlay, this.inputfieldViewChild.nativeElement);
      } else {
        PrimeDomHandler.relativePosition(this.overlay, this.inputfieldViewChild.nativeElement);
      }
    }
  }

  enableModality(element: HTMLElement) {
    if (!this.mask && !this.touchUI) {
      this.mask = document.createElement('div');
      this.mask.style.zIndex = String(parseInt(element.style.zIndex) - 1);
      let maskStyleClass = 'p-component-overlay p-datepicker-mask p-datepicker-mask-scrollblocker p-component-overlay p-component-overlay-enter';
      PrimeDomHandler.addMultipleClasses(this.mask, maskStyleClass);

      this.maskClickListener = this.renderer.listen(this.mask, 'click', (event: any) => {
        this.disableModality();
      });
      document.body.appendChild(this.mask);
      PrimeDomHandler.addClass(document.body, 'p-overflow-hidden');
    }
  }

  disableModality() {
    if (this.mask) {
      PrimeDomHandler.addClass(this.mask, 'p-component-overlay-leave');
      this.animationEndListener = this.destroyMask.bind(this);
      this.mask.addEventListener('animationend', this.animationEndListener);
    }
  }

  destroyMask() {
    if (!this.mask) {
      return;
    }

    document.body.removeChild(this.mask);
    let bodyChildren = document.body.children;
    let hasBlockerMasks: boolean;
    for (let i = 0; i < bodyChildren.length; i++) {
      let bodyChild = bodyChildren[i];
      if (PrimeDomHandler.hasClass(bodyChild, 'p-datepicker-mask-scrollblocker')) {
        hasBlockerMasks = true;
        break;
      }
    }

    if (!hasBlockerMasks) {
      PrimeDomHandler.removeClass(document.body, 'p-overflow-hidden');
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
      this.mask.removeEventListener('animationend', this.animationEndListener);
      this.animationEndListener = null;
    }
  }

  writeValue(value: any) {
    this.value = value;
    if (this.value && typeof this.value === 'string') {
      try {
        this.value = this.parseValueFromString(this.value);
      } catch {
        if (this.keepInvalid) {
          this.value = value;
        }
      }
    }

    this.updateInputField();
    this.updateUI();
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

  getDateFormat() {
    return this.dateFormat || 'yy/mm/dd';
  }

  getFirstDateOfWeek() {
    return this._firstDayOfWeek || 0;
  }

  // Ported from jquery-ui datepicker formatDate
  formatDate(date: Moment, format: string) {
    if (!date) {
      return '';
    }
    let iFormat;
    const lookAhead = (match: string) => {
      const matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
      if (matches) {
        iFormat++;
      }
      return matches;
    }
    const formatNumber = (match: string, value: number, len: number) => {
      let num = '' + value;
      if (lookAhead(match)) {
        while (num.length < len) {
          num = '0' + num;
        }
      }
      return num;
    }
    const formatName = (match, value, shortNames, longNames) => {
      return (lookAhead(match) ? longNames[value] : shortNames[value]);
    };
    let output = '';
    let literal = false;

    if (date) {
      for (iFormat = 0; iFormat < format.length; iFormat++) {
        if (literal) {
          if (format.charAt(iFormat) === '\'' && !lookAhead('\'')) {
            literal = false;
          } else {
            output += format.charAt(iFormat);
          }
        } else {
          switch (format.charAt(iFormat)) {
            case 'd':
              output += formatNumber('d', date.jDate(), 2);
              break;
            case 'D':
              output += formatName('D', date.jDay(), this.weekNamesShort, this.weekNames);
              break;
            case 'o':
              output += formatNumber('o',
                Math.round((
                  this.getMoment([date.jYear(), date.jMonth(), date.jDate()]).unix() -
                  this.getMoment([date.jYear(), 0, 0]).unix()) / 86400000), 3);
              break;
            case 'm':
              output += formatNumber('m', date.jMonth() + 1, 2);
              break;
            case 'M':
              output += formatName('M', date.jMonth(), this.monthNames, this.monthNames);
              break;
            case 'y':
              output += lookAhead('y') ? date.jYear() : (date.jYear() % 100 < 10 ? '0' : '') + (date.jYear() % 100);
              break;
            case '@':
              output += date.unix();
              break;
            case '!':
              output += date.unix() * 10000 + this.ticksTo1970;
              break;
            case '\'':
              if (lookAhead('\'')) {
                output += '\'';
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

  formatTime(date: Moment) {
    if (!date) {
      return '';
    }

    let output = '';
    let hours = date.hour();
    let minutes = date.minute();
    let seconds = date.second();

    if (this.hourFormat == '12' && hours > 11 && hours != 12) {
      hours -= 12;
    }

    if (this.hourFormat == '12') {
      output += hours === 0 ? 12 : (hours < 10) ? '0' + hours : hours;
    } else {
      output += (hours < 10) ? '0' + hours : hours;
    }
    output += ':';
    output += (minutes < 10) ? '0' + minutes : minutes;

    if (this.showSeconds) {
      output += ':';
      output += (seconds < 10) ? '0' + seconds : seconds;
    }

    if (this.hourFormat == '12') {
      output += date.hour() > 11 ? ' PM' : ' AM';
    }

    return output;
  }

  parseTime(value: string) {
    let tokens: string[] = value.split(':');
    let validTokenLength = this.showSeconds ? 3 : 2;

    if (tokens.length !== validTokenLength) {
      throw "Invalid time";
    }

    let h = parseInt(tokens[0]);
    let m = parseInt(tokens[1]);
    let s = this.showSeconds ? parseInt(tokens[2]) : null;

    if (isNaN(h) || isNaN(m) || h > 23 || m > 59 || (this.hourFormat == '12' && h > 12) || (this.showSeconds && (isNaN(s) || s > 59))) {
      throw "Invalid time";
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
  parseDate(value, format) {
    if (format == null || value == null) {
      throw "Invalid arguments";
    }

    value = (typeof value === "object" ? value.toString() : value + "");
    if (value === "") {
      return null;
    }

    let iFormat;
    let dim;
    let extra;
    let iValue = 0;
    let shortYearCutoff = (typeof this.shortYearCutoff !== "string" ? this.shortYearCutoff : this.getMoment().jYear() % 100 + parseInt(this.shortYearCutoff, 10));
    let year = -1;
    let month = -1;
    let day = -1;
    let doy = -1;
    let literal = false;
    let date;
    const lookAhead = (match) => {
      let matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
      if (matches) {
        iFormat++;
      }
      return matches;
    }
    const getNumber = (match) => {
      let isDoubled = lookAhead(match),
        size = (match === "@" ? 14 : (match === "!" ? 20 :
          (match === "y" && isDoubled ? 4 : (match === "o" ? 3 : 2)))),
        minSize = (match === "y" ? size : 1),
        digits = new RegExp("^\\d{" + minSize + "," + size + "}"),
        num = value.substring(iValue).match(digits);
      if (!num) {
        throw "Missing number at position " + iValue;
      }
      iValue += num[0].length;
      return parseInt(num[0], 10);
    }
    const getName = (match, shortNames, longNames) => {
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
        throw "Unknown name at position " + iValue;
      }
    };
    const checkLiteral = () => {
      if (value.charAt(iValue) !== format.charAt(iFormat)) {
        throw "Unexpected literal at position " + iValue;
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
          case "d":
            day = getNumber("d");
            break;
          case "D":
            getName("D", this.weekNamesShort, this.weekNames);
            break;
          case "o":
            doy = getNumber("o");
            break;
          case "m":
            month = getNumber("m");
            break;
          case "M":
            month = getName("M", this.monthNames, this.monthNames);
            break;
          case "y":
            year = getNumber("y");
            break;
          case "@":
            date = this.getMoment(getNumber("@"));
            year = date.jYear();
            month = date.jMonth() + 1;
            day = date.jDate();
            break;
          case "!":
            date = this.getMoment((getNumber("!") - this.ticksTo1970) / 10000);
            year = date.jYear();
            month = date.jMonth() + 1;
            day = date.jDate();
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
        throw "Extra/unparsed characters found in date: " + extra;
      }
    }

    if (year === -1) {
      year = this.getMoment().jYear();
    } else if (year < 100) {
      year += this.getMoment().jYear() - this.getMoment().jYear() % 100 +
        (year <= shortYearCutoff ? 0 : -100);
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

    date = this.daylightSavingAdjust(this.getMoment([year, month - 1, day]));

    if (date.jYear() !== year || date.jMonth() + 1 !== month || date.jDate() !== day) {
      throw "Invalid date"; // E.g. 31/02/00
    }

    return date;
  }

  daylightSavingAdjust(date: Moment) {
    if (!date) {
      return null;
    }
    date.hour(date.hour() > 12 ? date.hour() + 2 : 0);
    return date;
  }

  updateFilledState() {
    this.filled = this.inputFieldValue && this.inputFieldValue != '';
  }

  onTodayButtonClick(event: Event) {
    const date = this.getMoment();
    const dateMeta = {
      day: date.jDate(),
      month: date.jMonth(),
      year: date.jYear(),
      otherMonth: date.jMonth() !== this.currentMonth || date.jYear() !== this.currentYear,
      today: true,
      selectable: true
    };
    this.onDateSelect(event, dateMeta);
    this.onTodayClick.emit(event);
  }

  onClearButtonClick(event: Event) {
    this.updateModel(null);
    this.updateInputField();
    this.hideOverlay();
    this.onClearClick.emit(event);
  }

  createResponsiveStyle() {
    if (this.numberOfMonths > 1 && this.responsiveOptions) {
      if (!this.responsiveStyleElement) {
        this.responsiveStyleElement = document.createElement('style');
        this.responsiveStyleElement.type = 'text/css';
        document.body.appendChild(this.responsiveStyleElement);
      }

      let innerHTML = '';
      if (this.responsiveOptions) {
        let responsiveOptions = [...this.responsiveOptions]
          .filter(o => !!(o.breakpoint && o.numMonths))
          .sort((o1, o2) => -1 * o1.breakpoint.localeCompare(o2.breakpoint, undefined, {numeric: true}));

        for (let i = 0; i < responsiveOptions.length; i++) {
          let {breakpoint, numMonths} = responsiveOptions[i];
          let styles = `
                        .p-datepicker[${this.attributeSelector}] .p-datepicker-group:nth-child(${numMonths}) .p-datepicker-next {
                            display: inline-flex !important;
                        }
                    `;

          for (let j = numMonths; j < this.numberOfMonths; j++) {
            styles += `
                            .p-datepicker[${this.attributeSelector}] .p-datepicker-group:nth-child(${j + 1}) {
                                display: none !important;
                            }
                        `
          }

          innerHTML += `
                        @media screen and (max-width: ${breakpoint}) {
                            ${styles}
                        }
                    `
        }
      }

      this.responsiveStyleElement.innerHTML = innerHTML;
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
        const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : 'document';

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
      this.documentResizeListener = this.onWindowResize.bind(this);
      window.addEventListener('resize', this.documentResizeListener);
    }
  }

  unbindDocumentResizeListener() {
    if (this.documentResizeListener) {
      window.removeEventListener('resize', this.documentResizeListener);
      this.documentResizeListener = null;
    }
  }

  bindScrollListener() {
    if (!this.scrollHandler) {
      this.scrollHandler = new PrimeConnectedOverlayScrollHandler(this.containerViewChild.nativeElement, () => {
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
    return !(this.el.nativeElement.isSameNode(event.target) || this.isNavIconClicked(event) ||
      this.el.nativeElement.contains(event.target) || (this.overlay && this.overlay.contains(<Node>event.target)));
  }

  isNavIconClicked(event: Event) {
    return (PrimeDomHandler.hasClass(event.target, 'p-datepicker-prev') || PrimeDomHandler.hasClass(event.target, 'p-datepicker-prev-icon')
      || PrimeDomHandler.hasClass(event.target, 'p-datepicker-next') || PrimeDomHandler.hasClass(event.target, 'p-datepicker-next-icon'));
  }

  onWindowResize() {
    if (this.overlayVisible && !PrimeDomHandler.isTouchDevice()) {
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
      PrimeZIndexUtils.clear(this.overlay);
    }

    this.destroyResponsiveStyleElement();
    this.clearTimePickerTimer();
    this.restoreOverlayAppend();
    this.onOverlayHide();

    this.destroy$.next(true);
    this.destroy$.complete()
  }
}
