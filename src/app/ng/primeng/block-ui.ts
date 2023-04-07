import {NgModule} from '@angular/core';
import {BlockUI, BlockUIModule} from "primeng/blockui";

@NgModule({
  exports: [BlockUIModule]
})
export class PrimeBlockUiModule {
}

export const PrimeBlockUI = BlockUI;
