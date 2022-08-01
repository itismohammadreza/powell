import {Pipe, PipeTransform} from '@angular/core';
import {UtilsService} from '@ng/services';

@Pipe({
  name: 'ngSafePerWord',
})
export class SafePerWordPipe implements PipeTransform {
  constructor(private utlisService: UtilsService) {}

  transform(value: string): string {
    if (value)
      return this.utlisService.replaceArabicLettersWithPersianLetters(value);
    else return null;
  }
}
