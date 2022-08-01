import {Pipe, PipeTransform} from '@angular/core';
import {UtilsService} from '@ng/services';

@Pipe({
  name: 'ngPerToEnNum',
})
export class PerToEnNumPipe implements PipeTransform {
  constructor(private utlisService: UtilsService) {}

  transform(value: string): string | number {
    try {
      if (value) return this.utlisService.persianNumberToEng(value);
      else return null;
    } catch (e) {
      return 0;
    }
  }
}
