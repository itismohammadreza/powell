import {Component} from '@angular/core';
import {OverlayService, PersianService} from "@powell/api";
import {UserService} from "@core/http";
import {
  DynamicDialogSampleComponent
} from "@modules/main/pages/showcase/pages/utils/dynamic-dialog-sample/dynamic-dialog-sample.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'ng-utils-page',
  templateUrl: './utils.page.html',
  styleUrls: ['./utils.page.scss']
})
export class UtilsPage {
  customDynamicDialogResult: any;
  persianWord: string;

  constructor(private userService: UserService,
              private overlayService: OverlayService,
              private persianService: PersianService) {
  }

  showCustomDynamicDialog() {
    this.overlayService.open(DynamicDialogSampleComponent, {
      data: {message: 'I am a dynamic component inside of a dialog!'}
    }).afterClosed.pipe(takeUntilDestroyed()).subscribe(result => {
      this.customDynamicDialogResult = result;
    });
  }

  async request() {
    await this.userService.get();
  }

  onInputChange(event) {
    this.persianWord = this.persianService.toPersianWord(event.value)
  }
}
