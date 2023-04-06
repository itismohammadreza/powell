import {NgModule} from '@angular/core';
import {COMPONENTS} from './index';
import {StatusModule} from "@ng/components/status";

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [
    StatusModule
  ]
})
export class LayoutModule {
}
