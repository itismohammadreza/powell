import {Pipe, PipeTransform} from '@angular/core';
import {PersianService} from '@ng/services';

@Pipe({
  name: 'ngSafePerWord',
})
export class SafePerWordPipe implements PipeTransform {
  constructor(private persianService: PersianService) {}

  transform(value: string): string {
    if (value)
      return this.persianService.replaceArabicLettersWithPersianLetters(value);
    else return null;
  }
}
