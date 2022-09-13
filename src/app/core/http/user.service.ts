import {Injectable} from '@angular/core';
import {ApiService} from '@core/http';

@Injectable({
  providedIn: 'root',
})
export class UserService extends ApiService {
  private endpoint: string = 'photos?_start=0&_limit=20';

  constructor() {
    super();
  }

  get() {
    return this.get(this.endpoint, null);
  }
}
