import {NgModule} from '@angular/core';
import {TemplateDirective} from "@ng/directives/template";

@NgModule({
  declarations: [TemplateDirective],
  exports: [TemplateDirective]
})
export class TemplateModule {
}
