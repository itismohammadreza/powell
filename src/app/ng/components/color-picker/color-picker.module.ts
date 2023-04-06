import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {ColorPickerComponent} from "@ng/components/color-picker";
import {LabelStarModule} from "@ng/pipes/label-star";
import {InputTextModule} from "@ng/components/input-text";
import {PrimeColorPickerModule} from "@ng/primeng";

@NgModule({
  declarations: [ColorPickerComponent],
  exports: [ColorPickerComponent],
  imports: [
    PrimeColorPickerModule,
    InputTextModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    ConfigHandlerModule,
    AddonModule,
  ],
})
export class ColorPickerModule {
}
