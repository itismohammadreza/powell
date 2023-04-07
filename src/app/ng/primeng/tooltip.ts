import {NgModule} from '@angular/core';
import {Tooltip, TooltipModule} from "primeng/tooltip";

@NgModule({
  exports: [TooltipModule]
})
export class PrimeTooltipModule {
}

export const PrimeTooltip = Tooltip;
export type PrimeTooltip = Tooltip;
