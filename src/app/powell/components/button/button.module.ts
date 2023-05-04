import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ButtonComponent} from "@powell/components/button";
import {PrimeButtonModule} from "@powell/primeng";

@NgModule({
  declarations: [ButtonComponent],
  exports: [ButtonComponent],
  imports: [PrimeButtonModule, CommonModule],
})
export class ButtonModule {
}
