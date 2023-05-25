import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ButtonComponent} from "@powell/components/button";
import {PrimeButtonModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";

@NgModule({
  declarations: [ButtonComponent],
  exports: [ButtonComponent],
  imports: [PrimeButtonModule, CommonModule, TemplateModule],
})
export class ButtonModule {
}
