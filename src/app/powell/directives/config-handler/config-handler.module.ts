import {NgModule} from '@angular/core';
import {ConfigHandlerDirective} from "@powell/directives/config-handler";

@NgModule({
  declarations: [ConfigHandlerDirective],
  exports: [ConfigHandlerDirective]
})
export class ConfigHandlerModule {
}
