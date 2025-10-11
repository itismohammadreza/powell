import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreDataService<T = Optional<SafeAny>> {
  private storeDataSubject = new BehaviorSubject<Optional<T>>(undefined);
  private data: Optional<T> = Object.create({});

  set(event: Optional<T>) {
    this.data = {...this.data, ...event} as T;
    if (event == undefined) {
      this.data = undefined;
    }
    this.storeDataSubject.next(this.data);
  }

  get() {
    return this.storeDataSubject.getValue();
  }

  clear() {
    this.data = undefined;
    this.storeDataSubject.next(this.data);
  }
}
