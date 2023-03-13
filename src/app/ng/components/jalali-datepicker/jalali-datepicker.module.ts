import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {JalaliDatepickerComponent, JalaliPickerBaseComponent} from "@ng/components/jalali-datepicker";
import {LabelStarModule} from "@ng/pipes/label-star";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";

@NgModule({
  declarations: [JalaliDatepickerComponent, JalaliPickerBaseComponent],
  imports: [
    ButtonModule,
    RippleModule,
    ConfigHandlerModule,
    AddonModule,
    LabelStarModule,
    CommonModule,
    FormsModule
  ],
  exports: [JalaliDatepickerComponent]
})
export class JalaliDatepickerModule {
}
