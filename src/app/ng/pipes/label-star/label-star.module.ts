import {NgModule} from '@angular/core';
import {LabelStarPipe} from "@ng/pipes/label-star";

@NgModule({
  declarations: [LabelStarPipe],
  exports: [LabelStarPipe]
})
export class LabelStarModule {
}
