import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';

@Pipe({
  name: 'ngToBase64',
})
export class ToBase64Pipe implements PipeTransform {
  transform(value: any): any {
    return this.initImage(value);
  }

  initImage(value: any) {
    return new Observable((observer) => {
      if (value instanceof File) {
        this.fileToBase64(value).then((res) => {
          observer.next(res);
          observer.complete();
        });
      } else if (typeof value == 'string') {
        //value is a single base64
        if (value.startsWith('src=')) {
          observer.next(value);
          observer.complete();
          //value is a single url
        } else {
          this.urlToBase64(value).then((res) => {
            observer.next(res);
            observer.complete();
          });
        }
        //value is FileList
      } else if (value instanceof FileList) {
        const file: File = value.item(0);
        this.fileToBase64(file).then((res) => {
          observer.next(res);
          observer.complete();
        });
      }
    });
  }

  fileToBase64(file: File): Promise<string | ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => reject(error);
    });
  }

  urlToBase64(url: string): Promise<string | ArrayBuffer> {
    return fetch(url, {
      headers: new Headers({
        Origin: '*',
      }),
    })
      .then((response) => response.blob())
      .then((blob: File) => this.fileToBase64(blob));
  }
}
