import {Pipe, PipeTransform} from '@angular/core';
import {AbstractControl, NgControl} from "@angular/forms";

@Pipe({
  name: 'ngLabelStar'
})
export class LabelStarPipe implements PipeTransform {
  transform(label: string, showRequiredStar: boolean, ngControl: NgControl) {
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

  isControlRequired(ngControl: NgControl) {
    if (ngControl) {
      const control = ngControl.control;
      if (control.hasError('required')) {
        return true;
      }
    }
    return false;
  }
}
