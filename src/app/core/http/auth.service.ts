import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {lastValueFrom} from "rxjs";
import {ApiService} from '@core/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {
  private readonly endpoint: string = 'auth';
  private _currentUser: any;

  constructor(private router: Router) {
    super();
  }

  set currentUser(data: any) {
    this._currentUser = data;
  }

  get currentUser() {
    return this._currentUser;
  }

  getProfile() {
    const res = this._get<any>(`${this.endpoint}/self`);
    return lastValueFrom(res);
  }

  hasPermission(input: string[] | string) {
    if (!input || !input.length) {
      return true
    }
    const userPermissions = this.currentUser.permissions;
    if (Array.isArray(input)) {
      return userPermissions.some(p => input.includes(p))
    }
    return userPermissions.includes(input)
  }

  login(data: any) {
    const res = this._post<any>(`${this.endpoint}/login`, data);
    return lastValueFrom(res);
  }

  register(data: any) {
    const res = this._post(`${this.endpoint}/register`, data);
    return lastValueFrom(res);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
  }

  hasToken() {
    return !!localStorage.getItem('token');
  }
}
