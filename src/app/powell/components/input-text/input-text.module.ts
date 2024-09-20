import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AddonModule} from "@powell/directives/addon";
import {InputTextComponent} from "@powell/components/input-text";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$InputTextModule, $KeyFilterModule, $TimesIcon} from "@powell/primeng";

@NgModule({
  declarations: [InputTextComponent],
  exports: [InputTextComponent],
  imports: [
    $InputTextModule,
    $KeyFilterModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    AddonModule,
    $TimesIcon
  ],
})
export class InputTextModule {
}
