import {Pipe, PipeTransform} from '@angular/core';
import {UtilsService} from '@ng/services';

@Pipe({
  name: 'ngIsPerNum',
})
export class IsPerNumPipe implements PipeTransform {
  constructor(private utlisService: UtilsService) {}

  transform(value: string): boolean {
    if (value) return this.utlisService.isPersianNumber(value);
  }
}
