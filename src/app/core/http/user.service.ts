import {Injectable} from '@angular/core';
import {ApiService} from '@core/http';
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class UserService extends ApiService {
  private endpoint: string = 'photos?_start=0&_limit=20';

  constructor() {
    super();
  }

  get() {
    const res = this._get<any>(this.endpoint);
    return lastValueFrom(res);
  }
}
