import {Pipe, PipeTransform} from '@angular/core';
import {UtilsService} from '@ng/services';

@Pipe({
  name: 'ngEnToPerNum',
})
export class EnToPerNumPipe implements PipeTransform {
  constructor(private utlisService: UtilsService) {}

  transform(value: string): string {
    if (value) return this.utlisService.toPersianNumber(value);
    else return null;
  }
}
