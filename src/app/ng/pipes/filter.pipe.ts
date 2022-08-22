import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'ngFilter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], term: string, keys?: string): any[] {
    if (!term) {
      return value;
    }
    return (value || []).filter((item: any) => {
      if (keys) {
        return keys
          .split(',')
          .some(
            (key: string) =>
              item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])
          )
      } else {
        return new RegExp(term, 'gi').test(item)
      }
    });
  }
}
