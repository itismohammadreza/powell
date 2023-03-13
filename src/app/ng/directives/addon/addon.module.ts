import {NgModule} from '@angular/core';
import {AddonDirective} from "@ng/directives/addon";

@NgModule({
  declarations: [AddonDirective],
  exports: [AddonDirective]
})
export class AddonModule {
}
