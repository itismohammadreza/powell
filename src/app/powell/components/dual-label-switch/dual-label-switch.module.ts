import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {DualLabelSwitchComponent} from "@powell/components/dual-label-switch";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$ProgressSpinnerModule, $ToggleSwitchModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";
import {FormFieldModule} from "@powell/components/form-field";

@NgModule({
  declarations: [DualLabelSwitchComponent],
  exports: [DualLabelSwitchComponent, TemplateModule],
  imports: [
    $ToggleSwitchModule,
    $ProgressSpinnerModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    TemplateModule,
    FormFieldModule
  ],
})
export class DualLabelSwitchModule {
}
