import {Injectable, OnDestroy} from "@angular/core";
import {Observable, Subscription, EMPTY, fromEvent} from "rxjs";

@Injectable({providedIn: 'root'})
export class ScrollService {
  scrollObs: Observable<any>;
  resizeObs: Observable<any>;
  pos: number;
  private scrollSub: Subscription = new Subscription();
  private resizeSub: Subscription = new Subscription();

  constructor() {
    this.manageScrollPos();
    this.scrollObs = typeof window !== "undefined" ? fromEvent(window, "scroll") : EMPTY;
    this.scrollSub = this.scrollObs.subscribe(() => this.manageScrollPos());
    this.resizeObs = typeof window !== "undefined" ? fromEvent(window, "resize") : EMPTY;
    this.resizeSub = this.resizeObs.subscribe(() => this.manageScrollPos());
  }

  private manageScrollPos(): void {
    this.pos = typeof window !== "undefined" ? window.pageYOffset : 0;
  }
}
