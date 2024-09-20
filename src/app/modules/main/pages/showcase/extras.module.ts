import {NgModule} from '@angular/core';
import {
  PreviewOptionsComponent
} from "@modules/main/pages/showcase/components/preview-options/preview-options.component";
import {$CardModule, $DividerModule, $PanelModule} from "@powell/primeng";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    PreviewOptionsComponent,
  ],
  exports: [
    PreviewOptionsComponent,
    $CardModule,
    $PanelModule,
    $DividerModule,
    TranslateModule,
    CommonModule
  ],
  imports: [
    CommonModule,
    $DividerModule
  ]
})
export class ExtrasModule {
}
