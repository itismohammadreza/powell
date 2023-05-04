import {NgModule} from '@angular/core';
import {TemplateDirective} from "@powell/directives/template";

@NgModule({
  declarations: [TemplateDirective],
  exports: [TemplateDirective]
})
export class TemplateModule {
}
