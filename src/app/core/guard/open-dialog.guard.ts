import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot} from '@angular/router';
import {OverlayService} from "@ng/services";
import {Location} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class OpenDialogGuard implements CanDeactivate<any> {
  constructor(private overlayService: OverlayService, private router: Router, private location: Location) {
  }

  canDeactivate(component: any,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): boolean {
    if (this.overlayService.isAnyDialogOpen()) {
      this.overlayService.closeAnyOpenDialog();
      const currentUrlTree = this.router.createUrlTree([], currentRoute);
      const currentUrl = currentUrlTree.toString();
      this.location.go(currentUrl);
      return false;
    } else {
      return true
    }
  }
}
