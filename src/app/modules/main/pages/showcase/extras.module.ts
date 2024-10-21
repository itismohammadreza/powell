import {NgModule} from '@angular/core';
import {$CardModule, $DividerModule, $PanelModule} from "@powell/primeng";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  exports: [
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
