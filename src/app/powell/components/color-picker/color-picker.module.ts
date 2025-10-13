import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {ColorPickerComponent} from "@powell/components/color-picker";
import {LabelStarModule} from "@powell/pipes/label-star";
import {InputTextModule} from "@powell/components/input-text";
import {$ColorPickerModule} from "@powell/primeng";
import {FormFieldModule} from "@powell/components/form-field";

@NgModule({
  declarations: [ColorPickerComponent],
  exports: [ColorPickerComponent],
  imports: [
    $ColorPickerModule,
    InputTextModule,
    FormsModule,
    LabelStarModule,
    FormFieldModule,
  ],
})
export class ColorPickerModule {
}
