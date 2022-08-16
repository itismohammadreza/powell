import {Pipe, PipeTransform} from '@angular/core';
import {UtilsService} from '@ng/services';

@Pipe({
  name: 'ngNumToPerWord',
})
export class NgNumToPerWordPipe implements PipeTransform {
  constructor(private utilsService: UtilsService) {}

  transform(value: string): string {
    try {
      if (value) return this.utilsService.toPersianWord(value);
      else return null;
    } catch (e) {
      return `${value} is not valid number!`;
    }
  }
}
