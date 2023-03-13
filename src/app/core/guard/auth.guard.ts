import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanMatch,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {AuthService} from '@core/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanMatch {
  constructor(private router: Router, private authService: AuthService) {
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.authService.hasToken()) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.hasToken()) {
      return true;
    } else {
      this.router.navigate(['/auth/login'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.hasToken()) {
      return true;
    } else {
      this.router.navigate(['/auth/login'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }
}
