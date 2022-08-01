import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'fileName',
})
export class FileNamePipe implements PipeTransform {
  transform(value: any): string {
    if (value) {
      if (value instanceof File) {
        return value.name;
      } else if (this.isValidURL(value)) {
        return value.replace(/^.*[\\\/]/, '');
      } else {
        return value;
      }
    }
  }

  isValidURL(str: string) {
    const res = str.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null);
  };
}
