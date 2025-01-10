import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {LabelStarModule} from "@powell/pipes/label-star";
import {InputMaskComponent} from "@powell/components/input-mask";
import {$InputMaskModule} from "@powell/primeng";
import {FormFieldModule} from "@powell/components/form-field";

@NgModule({
  declarations: [InputMaskComponent],
  exports: [InputMaskComponent],
  imports: [
    $InputMaskModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    FormFieldModule,
  ],
})
export class InputMaskModule {
}
