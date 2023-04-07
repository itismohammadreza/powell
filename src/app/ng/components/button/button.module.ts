import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ButtonComponent} from "@ng/components/button";
import {PrimeButtonModule} from "@ng/primeng";

@NgModule({
  declarations: [ButtonComponent],
  exports: [ButtonComponent],
  imports: [PrimeButtonModule, CommonModule],
})
export class ButtonModule {
}
