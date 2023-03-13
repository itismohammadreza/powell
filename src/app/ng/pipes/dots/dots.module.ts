import {NgModule} from '@angular/core';
import {DotsPipe} from "@ng/pipes/dots";

@NgModule({
  declarations: [DotsPipe],
  exports: [DotsPipe]
})
export class DotsModule {
}
