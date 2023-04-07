import {NgModule} from '@angular/core';
import {InputSwitch, InputSwitchModule} from "primeng/inputswitch";

@NgModule({
  exports: [InputSwitchModule]
})
export class PrimeInputSwitchModule {
}

export const PrimeInputSwitch = InputSwitch;
