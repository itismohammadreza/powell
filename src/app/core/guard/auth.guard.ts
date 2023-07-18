import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "@core/http";

export const authGuard: CanActivateFn = (next, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const {permissions} = next.data;
  if (authService.hasToken()) {
    if (authService.hasPermission(permissions)) {
      return true
    } else {
      router.navigateByUrl('/404')
      return false
    }
  } else {
    authService.logout();
    return false;
  }
}
