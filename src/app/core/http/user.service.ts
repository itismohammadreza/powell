import {Injectable} from '@angular/core';
import {ApiService} from '@core/http';
import {Observable} from 'rxjs';

class User {
}

@Injectable({
  providedIn: 'root',
})
export class UserService extends ApiService {
  private endpoint: string = 'photos?_start=0&_limit=20';

  constructor() {
    super();
  }

  get(): Observable<any[]> {
    return this._get<User[]>(this.endpoint, null);
  }

  getById(id: number): Observable<User> {
    return this._get(this.endpoint + '/' + id);
  }
}
