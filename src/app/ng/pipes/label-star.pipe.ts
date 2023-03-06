import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'labelStar',
})
export class LabelStarPipe implements PipeTransform {
  addStarTo(value: string) {
    return value.concat(' *');
  }

  removeStarFrom(value: string) {
    return value.slice(0, -2);
  }

  transform(label: string, showRequiredStar: boolean, isControlRequired: boolean): string {
    if (!label) {
      return '';
    }
    if (showRequiredStar && isControlRequired) {
      return this.addStarTo(label);
    }
    return label;
  }
}
