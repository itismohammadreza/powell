import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AddonModule} from "@powell/directives/addon";
import {LabelStarModule} from "@powell/pipes/label-star";
import {InputMaskComponent} from "@powell/components/input-mask";
import {$InputMaskModule} from "@powell/primeng";

@NgModule({
  declarations: [InputMaskComponent],
  exports: [InputMaskComponent],
  imports: [
    $InputMaskModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    AddonModule
  ],
})
export class InputMaskModule {
}
