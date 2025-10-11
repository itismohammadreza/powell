import {Pipe, PipeTransform} from '@angular/core';
import {AbstractControl, NgControl} from "@angular/forms";

@Pipe({
  name: 'pwLabelStar',
  standalone: false
})
export class LabelStarPipe implements PipeTransform {
  transform(label: Optional<string>, showRequiredStar: boolean, ngControl: Nullable<NgControl>) {
    if (!label) {
      return '';
    }
    if (showRequiredStar && this.isControlRequired(ngControl)) {
      return this.starredLabel(label);
    }
    return label;
  }

  starredLabel(value: string) {
    return value.concat(' *');
  }

  isControlRequired(ngControl: Nullable<NgControl>) {
    if (ngControl) {
      const control = ngControl.control!;
      if (control.validator) {
        const validator = control.validator({} as AbstractControl);
        if (validator?.['required']) {
          return true;
        }
      }
    }
    return false;
  }
}
