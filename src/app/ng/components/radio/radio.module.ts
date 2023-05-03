import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RadioComponent} from "@ng/components/radio";
import {LabelStarModule} from "@ng/pipes/label-star";
import {PrimeRadioButtonModule} from "@ng/primeng";

@NgModule({
  declarations: [RadioComponent],
  exports: [RadioComponent],
  imports: [
    PrimeRadioButtonModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
  ],
})
export class RadioModule {
}
