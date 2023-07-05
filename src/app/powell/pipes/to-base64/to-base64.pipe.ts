import {Input, Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';
import {UtilsService} from "@powell/api";

@Pipe({
  name: 'ngToBase64'
})
export class ToBase64Pipe implements PipeTransform {
  @Input() isUnknownImageUrl: boolean;

  constructor(private utilsService: UtilsService) {
  }

  transform(value: any) {
    return this.initImage(value);
  }

  initImage(value: any) {
    return new Observable((observer) => {
      if (value instanceof File) {
        this.utilsService.fileToBase64(value).then((res) => {
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
          this.utilsService.urlToBase64(value).then((res) => {
            observer.next(res);
            observer.complete();
          });
        }
        // value is FileList
      } else if (value instanceof FileList) {
        const file: File = value.item(0);
        this.utilsService.fileToBase64(file).then((res) => {
          observer.next(res);
          observer.complete();
        });
      }
    });
  }
}
