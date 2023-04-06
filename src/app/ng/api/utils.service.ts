import {Inject, Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DOCUMENT} from '@angular/common';
import {fromEvent, merge, Observable, Observer} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  checkOnlineState(): Observable<boolean> {
    return merge(
      fromEvent(this.document.defaultView, 'offline').pipe(map(() => false)),
      fromEvent(this.document.defaultView, 'online').pipe(map(() => true)),
      new Observable((observer: Observer<boolean>) => {
        observer.next(navigator.onLine);
        observer.complete();
      })
    );
  }

  getDirtyControls(form: FormGroup, type: 'object' | 'array' | 'names' = 'object'): {} {
    const kv = Object.entries(form.controls).filter(val => val[1].dirty);
    const result = {
      object: kv.reduce((accum, val) => Object.assign(accum, {[val[0]]: val[1].value}), {}),
      array: kv.map(val => val[1]),
      names: kv.map(val => val[0])
    };
    return result[type];
  }

  convertToTimeFormat(seconds: number) {
    const hrs = Math.floor((seconds / 3600));
    const mins = Math.floor(((seconds % 3600) / 60));
    const secs = Math.floor(seconds % 60);
    let result = '';
    if (hrs > 0) {
      result += '' + hrs + ':' + (mins < 10 ? '0' : '');
    }
    result += '' + mins + ':' + (secs < 10 ? '0' : '');
    result += '' + secs;
    return result;
  }

  checkConnectionState(callback: any) {
    const imageUrl = 'https://via.placeholder.com/2000x2000';
    const downloadSize = 4995374;
    let startTime;
    let endTime;
    const download = new Image();
    download.onload = () => {
      endTime = (new Date()).getTime();
      const duration = (endTime - startTime) / 1000;
      const bitsLoaded = downloadSize * 8;
      const speedBps = +(bitsLoaded / duration).toFixed(2);
      const speedKbps = +(speedBps / 1024).toFixed(2);
      const speedMbps = +(speedKbps / 1024).toFixed(2);
      callback(speedMbps);
    };
    startTime = (new Date()).getTime();
    const cacheBuster = '?nnn=' + startTime;
    download.src = imageUrl + cacheBuster;
  }

  toggleFullScreen(elem: any) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
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
    }).then((response) => response.blob()).then((blob: File) => this.fileToBase64(blob));
  }

  base64toFile(dataUrl: any, filename: string): File {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
  }

  isImage(value: any) {
    if (!value) {
      return
    }

    const isImageUrl = (url: string) => {
      return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
    }

    const isImageFile = (file: File) => {
      return file && file['type'].split('/')[0] === 'image';
    }

    const isImageBase64 = (url: string) => {
      const ext = url.substring(url.indexOf('/') + 1, url.indexOf(';base64'));
      return ['png', 'jpg', 'jpeg', 'gif', 'tif', 'tiff'].indexOf(ext) > -1;
    }

    let result = false;
    if (Array.isArray(value)) {
      if (!value.length) {
        return false;
      }
      if (value.every((item) => item instanceof File && isImageFile(item))) {
        result = true;
      }
      if (value.every((item) => typeof item == 'string' && (isImageUrl(item) || isImageBase64(item)))) {
        result = true;
      }
    } else if (value instanceof File && isImageFile(value)) {
      result = true;
    } else if (typeof value == 'string' && (isImageUrl(value) || isImageBase64(value))) {
      result = true;
    } else if (value instanceof FileList) {
      for (let i = 0; i < value.length; i++) {
        if (isImageFile(value.item(i))) {
          result = true;
          continue;
        } else {
          result = false;
          break;
        }
      }
    }
    return result;
  }

  isValidURL(string: string) {
    const res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  };

  // async downloadLink(url: string) {
  //   const res = await this._customRequest<any>(url, 'get', null, {
  //     observe: 'response',
  //     responseType: 'blob'
  //   }).toPromise();
  //   const b64DecodeUnicode = (str: string) => {
  //     return decodeURIComponent(atob(str).split('').map(c =>{
  //       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //     }).join(''));
  //   }
  // const disposition = b64DecodeUnicode(res.headers.get('content-disposition'));
  //   const fileName = disposition.split('filename=')[1].split(';')[0];
  //   let downloadLink = document.createElement('a');
  //   downloadLink.href = window.URL.createObjectURL(new Blob([res.body], {type: res.body.type}));
  //   downloadLink.setAttribute('download', fileName);
  //   document.body.appendChild(downloadLink);
  //   downloadLink.click();
  //   downloadLink.remove()
  // }
}
