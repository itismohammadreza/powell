import {Pipe, PipeTransform} from '@angular/core';
import {UtilsService} from '@ng/services';

@Pipe({
  name: 'ngNumtoPerWord',
})
export class NumtoPerWordPipe implements PipeTransform {
  constructor(private utlisService: UtilsService) {}
  transform(value: string): string {
    try {
      if (value) return this.utlisService.toPersianWord(value);
      else return null;
    } catch (e) {
      return `${value} is not valid number!`;
    }
  }
}
