import {NgModule} from '@angular/core';
import {AddonDirective} from "@powell/directives/addon";

@NgModule({
  declarations: [AddonDirective],
  exports: [AddonDirective]
})
export class AddonModule {
}
