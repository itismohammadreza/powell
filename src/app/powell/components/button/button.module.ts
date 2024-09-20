import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ButtonComponent} from "@powell/components/button";
import {$ButtonModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";

@NgModule({
  declarations: [ButtonComponent],
  exports: [ButtonComponent, TemplateModule],
  imports: [$ButtonModule, CommonModule, TemplateModule],
})
export class ButtonModule {
}
