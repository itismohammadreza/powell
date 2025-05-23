import {Component, inject, OnInit} from '@angular/core';
import {PersianService, UtilsService} from "@powell/api";
import {DataService} from "@core/http";
import {DynamicDialogSampleComponent} from "@modules/main/pages/showcase/pages/utils";
import {takeUntil} from "rxjs";
import {ButtonModule} from "@powell/components/button";
import {InputNumberModule} from "@powell/components/input-number";
import {PreviewBase, PreviewComponent} from "@modules/main/pages/showcase/components";
import {DestroyService} from "@core/utils";
import {$DividerModule} from "@powell/primeng";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'ng-utils-page',
  templateUrl: './utils.page.html',
  imports: [
    ButtonModule,
    InputNumberModule,
    PreviewComponent,
    $DividerModule,
    TranslateModule,
    CommonModule
  ],
  providers: [DestroyService],
})
export class UtilsPage extends PreviewBase implements OnInit {
  private destroy$ = inject(DestroyService);
  private dataService = inject(DataService);
  private persianService = inject(PersianService);
  private utilsService = inject(UtilsService);

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
