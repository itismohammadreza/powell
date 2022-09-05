import {Pipe, PipeTransform} from '@angular/core';
import {PersianService} from '@ng/services';

@Pipe({
  name: 'ngEnToPerNum',
})
export class EnToPerNumPipe implements PipeTransform {
  constructor(private persianService: PersianService) {}

  transform(value: string): string {
    if (value) return this.persianService.toPersianNumber(value);
    else return null;
  }
}
