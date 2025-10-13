import {NgModule} from "@angular/core";
import {NgTemplateOutlet} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ToggleSwitchComponent} from "@powell/components/toggle-switch";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$ProgressSpinnerModule, $ToggleSwitchModule} from "@powell/primeng";
import {FormFieldModule} from "@powell/components/form-field";

@NgModule({
  declarations: [ToggleSwitchComponent],
  exports: [ToggleSwitchComponent],
  imports: [
    $ToggleSwitchModule,
    $ProgressSpinnerModule,
    NgTemplateOutlet,
    FormsModule,
    LabelStarModule,
    FormFieldModule
  ],
})
export class ToggleSwitchModule {
}
