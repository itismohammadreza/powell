import {NgModule} from '@angular/core';
import {DotsPipe} from "@powell/pipes/dots";

@NgModule({
  declarations: [DotsPipe],
  exports: [DotsPipe]
})
export class DotsModule {
}
