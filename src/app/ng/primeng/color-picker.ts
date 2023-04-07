import {NgModule} from '@angular/core';
import {ColorPicker, ColorPickerModule} from "primeng/colorpicker";

@NgModule({
  exports: [ColorPickerModule]
})
export class PrimeColorPickerModule {
}

export const PrimeColorPicker = ColorPicker;
