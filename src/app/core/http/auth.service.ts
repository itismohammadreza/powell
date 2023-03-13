import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {lastValueFrom} from "rxjs";
import {ApiService} from '@core/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {
  private readonly endpoint: string = 'auth';

  constructor(private router: Router) {
    super();
  }

  login(data: any): Promise<any> {
    const res = this._post<any>(`${this.endpoint}/login`, data);
    return lastValueFrom(res);
  }

  register(data: any): Promise<any> {
    const res = this._post(`${this.endpoint}/register`, data);
    return lastValueFrom(res);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
  }

  hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
