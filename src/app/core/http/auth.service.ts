import {Injectable} from '@angular/core';
import {ApiService} from '@core/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  private endpoint: string = 'auth';

  constructor(private router: Router) {
    super();
  }

  login(data: any): any {
    return this._post(
      `${this.endpoint}/login`,
      data
    ).toPromise();
  }

  register(data: any): any {
    return this._post(
      `${this.endpoint}/register`,
      data
    ).toPromise();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
  }

  hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
