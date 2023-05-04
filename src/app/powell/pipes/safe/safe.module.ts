import {NgModule} from '@angular/core';
import {SafePipe} from "@powell/pipes/safe";

@NgModule({
  declarations: [SafePipe],
  exports: [SafePipe]
})
export class SafeModule {
}
