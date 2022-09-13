import {Component, ViewContainerRef} from '@angular/core';
import {DynamicDialogService, OverlayService} from "@ng/services";
import {UserService} from "@core/http";
import {
  DynamicDialogSampleComponent
} from "@modules/main/pages/showcase/components/dynamic-dialog-sample/dynamic-dialog-sample.component";

@Component({
  selector: 'ng-utils-page',
  templateUrl: './utils.page.html',
  styleUrls: ['./utils.page.scss']
})
export class UtilsPage {
  constructor(
    private overlayService: OverlayService,
    private vcRef: ViewContainerRef,
    private userService: UserService,
    private dialog: DynamicDialogService,
  ) {
  }

  customDynamicDialogResult: any;

  showConfirm() {
    this.overlayService.showConfirmDialog({header: 'header', message: 'salam'}).then()
  }

  showCustomDynamicDialog() {
    this.dialog.open(DynamicDialogSampleComponent, {
      data: {message: 'I am a dynamic component inside of a dialog!'}
    }).afterClosed.subscribe(result => {
      this.customDynamicDialogResult = result;
    });
  }

  request() {
    this.userService.get().then(console.log);
  }
}
