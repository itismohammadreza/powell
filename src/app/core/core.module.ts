import {NgModule} from '@angular/core';
import {EnvServiceProvider} from "@core/utils";
import {OverlayService, PersianService, UtilsService} from "@powell/api";

@NgModule({
  providers: [
    EnvServiceProvider,
    OverlayService,
    PersianService,
    UtilsService,
  ],
})
export class CoreModule {
}
