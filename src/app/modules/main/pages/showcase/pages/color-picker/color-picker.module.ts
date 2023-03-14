import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ColorPickerModule as PColorPickerModule} from 'primeng/colorpicker';
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {ColorPickerComponent} from "@ng/components/color-picker";
import {LabelStarModule} from "@ng/pipes/label-star";
import {InputTextModule} from "@ng/components/input-text";

@NgModule({
  declarations: [ColorPickerComponent],
  imports: [
    PColorPickerModule,
    ConfigHandlerModule,
    InputTextModule,
    AddonModule,
    LabelStarModule,
    CommonModule,
    FormsModule
  ],
  exports: [ColorPickerComponent]
})
export class ColorPickerModule {
}
