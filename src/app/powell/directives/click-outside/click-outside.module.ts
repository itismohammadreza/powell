import {NgModule} from '@angular/core';
import {ClickOutsideDirective} from "@powell/directives/click-outside";

@NgModule({
  declarations: [ClickOutsideDirective],
  exports: [ClickOutsideDirective]
})
export class ClickOutsideModule {
}
