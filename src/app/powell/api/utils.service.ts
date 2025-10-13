import {DOCUMENT, inject, Injectable} from '@angular/core';

import {fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class UtilsService {
  private document = inject(DOCUMENT);

  checkOnlineState() {
    return merge(
      fromEvent(this.document.defaultView!, 'offline').pipe(map(() => false)),
      fromEvent(this.document.defaultView!, 'online').pipe(map(() => true)),
      new Observable<boolean>(observer => {
        observer.next(navigator.onLine);
        observer.complete();
      })
    );
  }

  requestFullScreen(element?: SafeAny) {
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
    const doc = this.document as SafeAny;
    if (doc.exitFullscreen) {
      doc.exitFullscreen();
    } else if (doc.webkitExitFullscreen) {
      doc.webkitExitFullscreen();
    } else if (doc.msExitFullscreen) {
      doc.msExitFullscreen();
    }
  }
}
