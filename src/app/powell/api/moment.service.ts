import {Injectable} from '@angular/core';
import * as moment from "moment";
import {DurationInputArg1, DurationInputArg2, Moment} from "moment";
import * as jalaliMoment from "jalali-moment";
import {MomentFormatSpecification, MomentInput} from "jalali-moment";

@Injectable()
export class MomentService {
  setGlobalLocale(language: string) {
    moment.locale(language);
    jalaliMoment.locale(language);
  }

  getGlobalLocale() {
    moment.locale();
  }

  getMonths(index?: number, format?: string) {
    return moment.months(format, index);
  }

  getMonthsShort(index?: number, format?: string) {
    return moment.monthsShort(format, index);
  }

  getWeekdays(localeSorted?: boolean, format?: string, index?: number) {
    return moment.weekdays(localeSorted, format, index);
  }

  getWeekdaysShort(localeSorted?: boolean, format?: string, index?: number) {
    return moment.weekdaysShort(localeSorted, format, index);
  }

  getWeekdaysMin(localeSorted?: boolean, format?: string, index?: number) {
    return moment.weekdaysMin(localeSorted, format, index);
  }

  getMoment(...input: any[]) {
    return moment(...input);
  }

  getMin(str: Moment[]) {
    return moment.min(str);
  }

  getMax(str: Moment[]) {
    return moment.max(str)
  }

  duration(value?: DurationInputArg1, unit?: DurationInputArg2) {
    return moment.duration(value, unit);
  }

  getJalaliMoment(input?: MomentInput, format?: MomentFormatSpecification, language?: string, strict?: boolean) {
    return jalaliMoment(input, format, language, strict);
  }

  /*
  * example usage for convert jalali to gregorian:
  *
  * `convertToGregorian('1392/6/3 16:40', 'YYYY/M/D HH:mm').format('YYYY-M-D HH:mm:ss');` `// 2013-8-25 16:40:00`
  * */
  convertToGregorian(input: string, format?: string) {
    return jalaliMoment.from(input, 'fa', format);
  }

  /*
  * example usage for convert gregorian to jalali:
  *
  * `convertToJalali('2013-8-25 16:40:00', 'YYYY-M-D HH:mm:ss').format('YYYY/M/D HH:mm:ss');` `// 1392/6/31 23:59:59`
  */
  convertToJalali(input: MomentInput, format?: MomentFormatSpecification) {
    return jalaliMoment(input, format).locale('fa');
  }

  getIsoDateWithoutTimeZone(date: Date) {
    const timestamp = date.getTime() - date.getTimezoneOffset() * 60000;
    const correctDate = new Date(timestamp);
    return correctDate.toISOString();
  }
}


