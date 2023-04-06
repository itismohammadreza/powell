import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ButtonComponent} from "@ng/components/button";
import {PrimeButtonModule} from "@ng/primeng";
import {TemplateModule} from "@ng/directives/template";

@NgModule({
  declarations: [ButtonComponent],
  exports: [ButtonComponent, TemplateModule],
  imports: [PrimeButtonModule, CommonModule],
})
export class ButtonModule {
}
