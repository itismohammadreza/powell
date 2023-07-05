import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreDataService<T = any> {
  private storeDataSubject = new BehaviorSubject<T>(null);
  private data: T;

  constructor() {
    this.data = Object.create({})
  }

  set(event: T) {
    this.data = {...this.data, ...event};
    if (event == null) {
      this.data = null;
    }
    this.storeDataSubject.next(this.data);
  }

  get() {
    return this.storeDataSubject.getValue();
  }

  clear() {
    this.data = null;
    this.storeDataSubject.next(this.data);
  }
}
