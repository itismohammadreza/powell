import {NgModule} from '@angular/core';
import {
  PreviewOptionsComponent
} from "@modules/main/pages/showcase/components/preview-options/preview-options.component";
import {PrimeCardModule, PrimeDividerModule, PrimePanelModule} from "@ng/primeng";
import {CommonModule} from "@angular/common";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    PreviewOptionsComponent,
  ],
  exports: [
    PreviewOptionsComponent,
    PrimeCardModule,
    PrimePanelModule,
    PrimeDividerModule,
    TranslateModule
  ],
  imports: [
    CommonModule,
    PrimeDividerModule,
    ConfigHandlerModule
  ]
})
export class ExtrasModule {
}
