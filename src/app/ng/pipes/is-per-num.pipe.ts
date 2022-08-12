import {Pipe, PipeTransform} from '@angular/core';
import {UtilsService} from '@ng/services';

@Pipe({
  name: 'ngIsPerNum',
})
export class IsPerNumPipe implements PipeTransform {
  constructor(private utilsService: UtilsService) {}

  transform(value: string): boolean {
    if (value) return this.utilsService.isPersianNumber(value);
  }
}
