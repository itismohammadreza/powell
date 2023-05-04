import {NgModule} from '@angular/core';
import {ChartModule, UIChart} from "primeng/chart";

@NgModule({
  exports: [ChartModule]
})
export class PrimeChartModule {
}

export const PrimeChart = UIChart;
export type PrimeChart = UIChart;
