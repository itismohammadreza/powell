import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {DataService} from "@core/http";

export const authGuard: CanActivateFn = (next, state) => {
  const dataService = inject(DataService);
  const router = inject(Router);
  const {permissions} = next.data;
  if (!!dataService.getToken()) {
    if (dataService.hasPermission(permissions)) {
      return true
    } else {
      router.navigateByUrl('/403')
      return false
    }
  } else {
    dataService.logout();
    return false;
  }
}
