import {NgModule} from '@angular/core';
import {
  PreviewOptionsComponent
} from "@modules/main/pages/showcase/components/preview-options/preview-options.component";
import {PrimeCardModule, PrimeDividerModule, PrimePanelModule} from "@ng/primeng";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {ConfigHandler} from "@ng/api";

@NgModule({
  declarations: [
    PreviewOptionsComponent,
  ],
  exports: [
    PreviewOptionsComponent,
    PrimeCardModule,
    PrimePanelModule,
    PrimeDividerModule,
    TranslateModule,
    CommonModule
  ],
  imports: [
    CommonModule,
    PrimeDividerModule,
    ConfigHandler
  ]
})
export class ExtrasModule {
}
