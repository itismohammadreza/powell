import {NgModule} from '@angular/core';
import {Timeline, TimelineModule} from "primeng/timeline";

@NgModule({
  exports: [TimelineModule]
})
export class PrimeTimelineModule {
}

export const PrimeTimeline = Timeline;
