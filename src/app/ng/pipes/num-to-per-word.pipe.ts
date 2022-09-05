import {Pipe, PipeTransform} from '@angular/core';
import {PersianService} from '@ng/services';

@Pipe({
  name: 'ngNumToPerWord',
})
export class NgNumToPerWordPipe implements PipeTransform {
  constructor(private persianService: PersianService) {}

  transform(value: string): string {
    try {
      if (value) return this.persianService.toPersianWord(value);
      else return null;
    } catch (e) {
      return `${value} is not valid number!`;
    }
  }
}
