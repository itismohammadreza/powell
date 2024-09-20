import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SliderComponent} from "@powell/components/slider";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$SliderModule} from "@powell/primeng";

@NgModule({
  declarations: [SliderComponent],
  exports: [SliderComponent],
  imports: [
    $SliderModule,
    CommonModule,
    FormsModule,
    LabelStarModule
  ],
})
export class SliderModule {
}
