import {Pipe, PipeTransform} from '@angular/core';
import {helpers} from "@core/utils";

@Pipe({
  name: 'pwFileName',
  standalone: false
})
export class FileNamePipe implements PipeTransform {
  transform(value: SafeAny) {
    if (value) {
      if (value instanceof File) {
        return value.name;
      } else if (helpers.isValidURL(value)) {
        return value.replace(/^.*[\\\/]/, '');
      } else {
        return value;
      }
    }
  }
}
