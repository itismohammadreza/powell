import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'ngDate'
})
export class DatePipe implements PipeTransform {
  transform(value: any, locale: 'fa-ir' | 'en-us') {
    if (value) {
      return new Date(value).toLocaleDateString(locale);
    }
    return '';
  }
}
