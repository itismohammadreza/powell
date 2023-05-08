import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AddonModule} from "@powell/directives/addon";
import {ColorPickerComponent} from "@powell/components/color-picker";
import {LabelStarModule} from "@powell/pipes/label-star";
import {InputTextModule} from "@powell/components/input-text";
import {PrimeColorPickerModule} from "@powell/primeng";
import {ConfigHandlerModule} from "@powell/directives/config-handler";

@NgModule({
  declarations: [ColorPickerComponent],
  exports: [ColorPickerComponent],
  imports: [
    PrimeColorPickerModule,
    InputTextModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    AddonModule,
    ConfigHandlerModule
  ],
})
export class ColorPickerModule {
}
