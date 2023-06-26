import {inject} from '@angular/core';
import {OverlayService} from "@powell/api";
import {CanActivateFn} from "@angular/router";

export const openDialogGuard: CanActivateFn = async () => {
  const overlayService = inject(OverlayService)
  await overlayService.closeAnyOpenDialog();
  return true;
}
