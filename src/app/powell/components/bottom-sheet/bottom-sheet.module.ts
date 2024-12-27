import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {BottomSheetComponent} from "@powell/components/bottom-sheet";
import {ButtonModule} from "@powell/components/button";
import {$DrawerModule, $TimesIcon} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";

@NgModule({
  declarations: [BottomSheetComponent],
  exports: [BottomSheetComponent, TemplateModule],
  imports: [
    $DrawerModule,
    ButtonModule,
    CommonModule,
    $TimesIcon
  ],
})
export class BottomSheetModule {
}
