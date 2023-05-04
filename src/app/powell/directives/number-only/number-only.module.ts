import {NgModule} from '@angular/core';
import {NumberOnlyDirective} from "@powell/directives/number-only";

@NgModule({
  declarations: [NumberOnlyDirective],
  exports: [NumberOnlyDirective]
})
export class NumberOnlyModule {
}
