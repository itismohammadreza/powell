import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {OverlayService} from "@ng/api";

@Injectable({
  providedIn: 'root'
})
export class OpenDialogGuard implements CanDeactivate<any> {
  constructor(private overlayService: OverlayService) {
  }

  async canDeactivate(component: any,
                      currentRoute: ActivatedRouteSnapshot,
                      currentState: RouterStateSnapshot,
                      nextState?: RouterStateSnapshot): Promise<boolean> {
    await this.overlayService.closeAnyOpenDialog();
    return true;
  }
}
