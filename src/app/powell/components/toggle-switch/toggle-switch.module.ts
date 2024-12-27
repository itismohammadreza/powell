import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ToggleSwitchComponent} from "@powell/components/toggle-switch";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$ProgressSpinnerModule, $ToggleSwitchModule} from "@powell/primeng";

@NgModule({
  declarations: [ToggleSwitchComponent],
  exports: [ToggleSwitchComponent],
  imports: [
    $ToggleSwitchModule,
    $ProgressSpinnerModule,
    CommonModule,
    FormsModule,
    LabelStarModule
  ],
})
export class ToggleSwitchModule {
}
