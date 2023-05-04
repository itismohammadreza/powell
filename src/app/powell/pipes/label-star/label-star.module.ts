import {NgModule} from '@angular/core';
import {LabelStarPipe} from "@powell/pipes/label-star";

@NgModule({
  declarations: [LabelStarPipe],
  exports: [LabelStarPipe]
})
export class LabelStarModule {
}
