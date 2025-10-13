import {Observable, Subject} from 'rxjs';

export class DynamicDialogRef {
  private readonly _afterClosed = new Subject<SafeAny>();
  afterClosed: Observable<SafeAny> = this._afterClosed.asObservable();

  close(result?: SafeAny) {
    this._afterClosed.next(result);
  }
}
