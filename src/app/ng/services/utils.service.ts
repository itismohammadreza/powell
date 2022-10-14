import {Inject, Injectable} from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';
import {fromEvent, merge, Observable, Observer} from 'rxjs';
import {map} from 'rxjs/operators';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
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

  getDirtyControls(
    form: UntypedFormGroup,
    type: 'object' | 'array' | 'names' = 'object'
  ): {} {
    const kv = Object.entries(form.controls).filter((val) => val[1].dirty);
    const result = {
      object: () =>
        kv.reduce(
          (accum, val) => Object.assign(accum, {[val[0]]: val[1].value}),
          {}
        ),
      array: () => kv.map((val) => val[1]),
      names: () => kv.map((val) => val[0])
    }[type]();
    return Object.assign(result, {id: form.get('id').value});
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

  // downloadLink(url: string) {
  //   const a: HTMLAnchorElement = document.createElement("a");
  //   const fileName = ''
  //   document.body.appendChild(a);
  //   a.style.display = "none";
  //   a.href = url;
  //   a.download = fileName;
  //   a.click();
  //   window.URL.revokeObjectURL(url);
  // }

  // getStreamFile(id: string) {
  //   return this._post<any>('exam/download', {id}, {
  //     responseType: 'arrayBuffer',
  //     observe: 'response'
  //   }).toPromise();
  // }

  // getObjectUrlFromStreamedFile(response: HttpResponse<any>) {
  //   response.headers.set('Access-Control-Expose-Headers', '*');
  //   const blob = new Blob([response.body], {type: 'application/x-gzip'});
  //   const safeUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
  //   const contentDisposition = response.headers.get('content-disposition');
  //   const fileName = contentDisposition.split('filename=')[1].split(';')[0];
  //   const fileUrl = safeUrl['changingThisBreaksApplicationSecurity'];
  //   return {fileName, fileUrl};
  // }
}
