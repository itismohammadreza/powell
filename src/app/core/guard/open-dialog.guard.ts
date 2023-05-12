import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {OverlayService} from "@powell/api";

@Injectable({
  providedIn: 'root'
})
export class OpenDialogGuard  {
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
