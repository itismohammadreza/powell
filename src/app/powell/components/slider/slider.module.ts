import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SliderComponent} from "@powell/components/slider";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$SliderModule} from "@powell/primeng";
import {ElementAdditionsModule} from "@powell/components/element-additions";

@NgModule({
  declarations: [SliderComponent],
  exports: [SliderComponent],
  imports: [
    $SliderModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    ElementAdditionsModule
  ],
})
export class SliderModule {
}
