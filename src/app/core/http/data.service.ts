import {Injectable} from '@angular/core';
import {lastValueFrom} from "rxjs";
import {ApiService} from '@core/http';

@Injectable({
  providedIn: 'root'
})
export class DataService extends ApiService {
  private endpoint: string = 'photos';

  constructor() {
    super();
  }

  get() {
    const res = this._get<any>(this.endpoint, {params: {_start: 0, _limit: 20}});
    return lastValueFrom(res);
  }

  getCustomers(filters?: any) {
    const res = this._customRequest<any>('https://www.primefaces.org/data/customers', 'GET', null, {params: filters});
    return lastValueFrom(res);
  }
}
