import {Component, ViewContainerRef} from '@angular/core';
import {DynamicDialogService, OverlayService} from "@ng/services";
import {UserService} from "@core/http";
import {
  DynamicDialogSampleComponent
} from "@modules/main/pages/showcase/components/dynamic-dialog-sample/dynamic-dialog-sample.component";
import {Router} from "@angular/router";

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
    private router: Router,
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

  async request() {
    await this.userService.get().then(console.log);
    await this.overlayService.showConfirmDialog({
      header: 'asdasd'
    })
    this.router.navigateByUrl('/showcase')
  }
}
