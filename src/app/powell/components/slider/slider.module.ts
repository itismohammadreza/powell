import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {SliderComponent} from "@powell/components/slider";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$SliderModule} from "@powell/primeng";
import {FormFieldModule} from "@powell/components/form-field";

@NgModule({
  declarations: [SliderComponent],
  exports: [SliderComponent],
  imports: [
    $SliderModule,
    FormsModule,
    LabelStarModule,
    FormFieldModule
  ],
})
export class SliderModule {
}
