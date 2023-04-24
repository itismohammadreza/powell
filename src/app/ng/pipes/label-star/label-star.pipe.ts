import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'ngLabelStar'
})
export class LabelStarPipe implements PipeTransform {
  starredLabel(value: string) {
    return value.concat(' *');
  }

  transform(label: string, showRequiredStar: boolean, isControlRequired: boolean): string {
    if (!label) {
      return '';
    }
    if (showRequiredStar && isControlRequired) {
      return this.starredLabel(label);
    }
    return label;
  }
}
