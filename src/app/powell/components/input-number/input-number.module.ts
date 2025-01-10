import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {InputNumberComponent} from "@powell/components/input-number";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$InputNumberModule} from "@powell/primeng";
import {FormFieldModule} from "@powell/components/form-field";

@NgModule({
  declarations: [InputNumberComponent],
  exports: [InputNumberComponent],
  imports: [
    $InputNumberModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    FormFieldModule,
  ],
})
export class InputNumberModule {
}
