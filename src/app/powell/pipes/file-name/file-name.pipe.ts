import {Pipe, PipeTransform} from '@angular/core';
import {UtilsService} from "@powell/api";

@Pipe({
  name: 'ngFileName'
})
export class FileNamePipe implements PipeTransform {
  constructor(private utilsService: UtilsService) {
  }

  transform(value: any) {
    if (value) {
      if (value instanceof File) {
        return value.name;
      } else if (this.utilsService.isValidURL(value)) {
        return value.replace(/^.*[\\\/]/, '');
      } else {
        return value;
      }
    }
  }
}
