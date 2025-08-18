import {Input, Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';
import {helpers} from "@core/utils";

@Pipe({
  name: 'pwToBase64',
  standalone: false
})
export class ToBase64Pipe implements PipeTransform {
  @Input() isUnknownImageUrl: boolean;

  transform(value: any) {
    return this.initImage(value);
  }

  initImage(value: any) {
    return new Observable((observer) => {
      if (value instanceof File) {
        helpers.fileToBase64(value).then((res) => {
          observer.next(res);
          observer.complete();
        });
      } else if (typeof value == 'string') {
        // value is a single base64
        if (value.startsWith('src=')) {
          observer.next(value);
          observer.complete();
          // value is a single url
        } else {
          helpers.urlToBase64(value).then((res) => {
            observer.next(res);
            observer.complete();
          });
        }
        // value is FileList
      } else if (value instanceof FileList) {
        const file: File = value.item(0);
        helpers.fileToBase64(file).then((res) => {
          observer.next(res);
          observer.complete();
        });
      }
    });
  }
}
