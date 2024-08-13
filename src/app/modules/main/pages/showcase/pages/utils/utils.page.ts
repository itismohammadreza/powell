import {Component, inject, OnInit} from '@angular/core';
import {OverlayService, PersianService, UtilsService} from "@powell/api";
import {DataService} from "@core/http";
import {
  DynamicDialogSampleComponent
} from "@modules/main/pages/showcase/pages/utils/dynamic-dialog-sample/dynamic-dialog-sample.component";
import {takeUntil} from "rxjs";
import {DestroyService} from "@core/utils";

@Component({
  selector: 'ng-utils-page',
  templateUrl: './utils.page.html',
  styleUrls: ['./utils.page.scss'],
  providers: [DestroyService]
})
export class UtilsPage implements OnInit {
  private dataService = inject(DataService);
  private overlayService = inject(OverlayService);
  private persianService = inject(PersianService);
  private utilsService = inject(UtilsService);
  private destroy$ = inject(DestroyService);

  customDynamicDialogResult: any;
  persianWord: string;
  networkStatus: string;

  ngOnInit() {
    this.utilsService.checkOnlineState().subscribe(res => {
      this.networkStatus = res ? 'online' : 'offline';
    })
  }

  showCustomDynamicDialog() {
    this.overlayService.open(DynamicDialogSampleComponent, {
      data: {message: 'I am a dynamic component inside of a dialog!'}
    }).afterClosed.pipe(takeUntil(this.destroy$)).subscribe(result => {
      this.customDynamicDialogResult = result;
    });
  }

  async request({loadingCallback}) {
    try {
      await this.dataService.get();
      loadingCallback();
    } catch {
      loadingCallback();
    }
  }

  onInputChange(event) {
    this.persianWord = this.persianService.toPersianWord(event.value)
  }
}
