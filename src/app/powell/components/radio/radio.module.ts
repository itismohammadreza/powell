import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {RadioComponent} from "@powell/components/radio";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$RadioButtonModule} from "@powell/primeng";
import {FormFieldModule} from "@powell/components/form-field";

@NgModule({
  declarations: [RadioComponent],
  exports: [RadioComponent],
  imports: [
    $RadioButtonModule,
    FormsModule,
    LabelStarModule,
    FormFieldModule
  ],
})
export class RadioModule {
}
