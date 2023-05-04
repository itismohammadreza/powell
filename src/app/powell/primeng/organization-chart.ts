import {NgModule} from '@angular/core';
import {OrganizationChart, OrganizationChartModule} from "primeng/organizationchart";

@NgModule({
  exports: [OrganizationChartModule]
})
export class PrimeOrganizationChartModule {
}

export const PrimeOrganizationChart = OrganizationChart;
export type PrimeOrganizationChart = OrganizationChart;
