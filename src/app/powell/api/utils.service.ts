import {Inject, Injectable} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';
import {DOCUMENT} from '@angular/common';
import {fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ConfigService} from "@powell/api";

@Injectable()
export class UtilsService {
  constructor(@Inject(DOCUMENT) private document: Document, private configService: ConfigService) {
  }

  checkOnlineState() {
    return merge(
      fromEvent(this.document.defaultView, 'offline').pipe(map(() => false)),
      fromEvent(this.document.defaultView, 'online').pipe(map(() => true)),
      new Observable<boolean>(observer => {
        observer.next(navigator.onLine);
        observer.complete();
      })
    );
  }

  getDirtyControls(form: FormGroup) {
    const result = {};
    const isDirty = (control: AbstractControl) => {
      if (control instanceof FormGroup) {
        return Object.values(control.controls).some((c: AbstractControl) => c.dirty && isDirty(c))
      }
      if (control instanceof FormControl) {
        return control.value && control.dirty
      }
      if (control instanceof FormArray) {
        return control.controls.some(g => isDirty(g))
      }
    }
    const fillResult = (group: FormGroup, res: any) => Object.entries(group.controls).forEach(([name, control]) => {
      if (control instanceof FormControl && isDirty(control)) {
        if (Array.isArray(res)) {
          res.push({[name]: control.value})
        } else {
          res[name] = control.value;
        }
      } else if (control instanceof FormGroup && isDirty(control)) {
        res[name] = {};
        fillResult(control, res[name])
      } else if (control instanceof FormArray && isDirty(control)) {
        res[name] = [];
        control.controls.forEach((g: FormGroup) => {
          if (isDirty(g)) {
            fillResult(g, res[name])
          }
        })
      }
    })
    fillResult(form, result);
    if (JSON.stringify(result) == '{}') {
      return null;
    }
    return result;
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

  checkConnectionSpeed(callback: any) {
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

  requestFullScreen(element?: any) {
    if (!element) {
      element = this.document;
    }
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  exitFullscreen() {
    const doc = this.document as any;
    if (doc.exitFullscreen) {
      doc.exitFullscreen();
    } else if (doc.webkitExitFullscreen) {
      doc.webkitExitFullscreen();
    } else if (doc.msExitFullscreen) {
      doc.msExitFullscreen();
    }
  }

  fileToBase64(file: File) {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => reject(error);
    });
  }

  urlToBase64(url: string) {
    return fetch(url, {
      headers: new Headers({
        Origin: '*',
      }),
    }).then((response) => response.blob()).then((blob: File) => this.fileToBase64(blob));
  }

  base64toFile(dataUrl: any, filename: string) {
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

  blobToFile(blob: Blob, fileName: string) {
    const b = blob as any;
    b.lastModifiedDate = new Date();
    b.name = fileName;
    return blob as File;
  }

  getTypeClass(fileType: string) {
    return fileType.substring(0, fileType.indexOf('/'));
  }

  isWildcard(fileType: string) {
    return fileType.indexOf('*') !== -1;
  }

  getFileExtension(file: File) {
    return '.' + file.name.split('.').pop();
  }

  isFileTypeValid(file: File, acceptList: string, separator: string = ',') {
    let acceptableTypes = acceptList.split(separator).map((type) => type.trim());
    for (let type of acceptableTypes) {
      const checkTypeClass = this.getTypeClass(file.type) === this.getTypeClass(type);
      const checkExtension = file.type == type || this.getFileExtension(file).toLowerCase() === type.toLowerCase();
      let acceptable = this.isWildcard(type) ? checkTypeClass : checkExtension;
      if (acceptable) {
        return true;
      }
    }
    return false;
  }

  isFileSizeValid(file: File, max: number, min?: number) {
    const size = file.size;
    const supportMin = min ? size >= min : true;
    const supportMax = max ? size <= min : true;
    return supportMin && supportMax;
  }

  isImage(value: any) {
    if (!value) {
      return
    }

    const isImageUrl = (url: string) => {
      return /\.(jpeg|jpg|gif|png)$/.exec(url) != null;
    }

    const isImageFile = (file: File) => {
      return file.type.split('/')[0] === 'image' || /^image\//.test(file.type);
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
        } else {
          result = false;
          break;
        }
      }
    }
    return result;
  }

  isValidURL(url: string) {
    const res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  };

  setInputDirection(element: any, value: string, rtl: boolean) {
    const rgx = /^[-!$%^&*()_+|~=`{}\[\]:\";'<>?,.\/]*[A-Za-z]/;
    const isAscii = rgx.test(value);
    const isRtl = rtl ?? this.configService.getConfig().rtl;
    if (isAscii) {
      if (value) {
        element.style.direction = 'ltr';
        element.style.textAlign = 'left';
      } else {
        element.style.direction = isRtl ? 'rtl' : 'ltr';
        element.style.textAlign = isRtl ? 'right' : 'left';
      }
    } else {
      if (value) {
        element.style.direction = 'rtl';
        element.style.textAlign = 'right';
      } else {
        element.style.direction = isRtl ? 'rtl' : 'ltr';
        element.style.textAlign = isRtl ? 'right' : 'left';
      }
    }
  }

  joinArraysWithoutDuplicates(array1: any[], array2: any[], field: string) {
    const set1 = new Set(array1.map(x => x[field]));
    return [...array1, ...array2.filter(x => !set1.has(x[field]))]
  }

  findIndex<T = any>(array: T[], conditions: T | Partial<T>) {
    return array.findIndex(item => Object.entries(conditions).reduce((prev, next) => prev && item[next[0]] === next[1], {}));
  }

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
