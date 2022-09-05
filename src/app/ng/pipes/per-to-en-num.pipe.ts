import {Pipe, PipeTransform} from '@angular/core';
import {PersianService} from '@ng/services';

@Pipe({
  name: 'ngPerToEnNum',
})
export class PerToEnNumPipe implements PipeTransform {
  constructor(private persianService: PersianService) {}

  transform(value: string): string | number {
    try {
      if (value) return this.persianService.persianNumberToEng(value);
      else return null;
    } catch (e) {
      return 0;
    }
  }
}
