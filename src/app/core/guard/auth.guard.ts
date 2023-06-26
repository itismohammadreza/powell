import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "@core/http";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.hasToken()) {
    return true;
  } else {
    router.navigate(['/auth/login'], {queryParams: {returnUrl: route.url}});
    return false;
  }
}
