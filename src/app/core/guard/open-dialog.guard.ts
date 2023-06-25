import {inject} from '@angular/core';
import {OverlayService} from "@powell/api";

export const openDialogGuard = async (): Promise<boolean> => {
  const overlayService = inject(OverlayService)
  await overlayService.closeAnyOpenDialog();
  return true;
}
