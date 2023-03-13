import {NgModule} from '@angular/core';
import {NumberOnlyDirective} from "@ng/directives/number-only";

@NgModule({
  declarations: [NumberOnlyDirective],
  exports: [NumberOnlyDirective]
})
export class NumberOnlyModule {
}
