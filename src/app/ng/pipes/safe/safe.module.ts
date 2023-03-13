import {NgModule} from '@angular/core';
import {SafePipe} from "@ng/pipes/safe";

@NgModule({
  declarations: [SafePipe],
  exports: [SafePipe]
})
export class SafeModule {
}
