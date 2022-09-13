import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private readonly isLoadingSubject = new BehaviorSubject(false);

  setLoadingState(value: boolean) {
    this.isLoadingSubject.next(value);
  }

  getLoadingState() {
    return this.isLoadingSubject.asObservable();
  }
}
