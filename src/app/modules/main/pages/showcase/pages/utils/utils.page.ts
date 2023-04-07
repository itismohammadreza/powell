import {Component, OnDestroy} from '@angular/core';
import {DynamicDialogService, PersianService} from "@ng/api";
import {UserService} from "@core/http";
import {
  DynamicDialogSampleComponent
} from "@modules/main/pages/showcase/pages/utils/dynamic-dialog-sample/dynamic-dialog-sample.component";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'ng-utils-page',
  templateUrl: './utils.page.html',
  styleUrls: ['./utils.page.scss']
})
export class UtilsPage implements OnDestroy {
  customDynamicDialogResult: any;
  persianWord: string;
  destroy$ = new Subject<boolean>()

  constructor(private userService: UserService,
              private dialog: DynamicDialogService,
              private persianService: PersianService) {
  }

  showCustomDynamicDialog() {
    this.dialog.open(DynamicDialogSampleComponent, {
      data: {message: 'I am a dynamic component inside of a dialog!'}
    }).afterClosed.pipe(takeUntil(this.destroy$)).subscribe(result => {
      this.customDynamicDialogResult = result;
    });
  }

  async request() {
    await this.userService.get();
  }

  onInputChange(event) {
    this.persianWord = this.persianService.toPersianWord(event.value)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete()
  }
}
