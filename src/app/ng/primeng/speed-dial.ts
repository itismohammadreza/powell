import {NgModule} from '@angular/core';
import {SpeedDial, SpeedDialModule} from "primeng/speeddial";

@NgModule({
  exports: [SpeedDialModule]
})
export class PrimeSpeedDialModule {
}

export const PrimeSpeedDial = SpeedDial;
