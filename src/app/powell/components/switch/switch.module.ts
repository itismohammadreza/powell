import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SwitchComponent} from "@powell/components/switch";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$InputSwitchModule, $ProgressSpinnerModule} from "@powell/primeng";

@NgModule({
  declarations: [SwitchComponent],
  exports: [SwitchComponent],
  imports: [
    $InputSwitchModule,
    $ProgressSpinnerModule,
    CommonModule,
    FormsModule,
    LabelStarModule
  ],
})
export class SwitchModule {
}
