import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ToggleButtonComponent} from "@powell/components/toggle-button";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$ToggleButtonModule} from "@powell/primeng";
import {ElementAdditionsModule} from "@powell/components/element-additions";

@NgModule({
  declarations: [ToggleButtonComponent],
  exports: [ToggleButtonComponent],
  imports: [
    $ToggleButtonModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    ElementAdditionsModule
  ],
})

export class ToggleButtonModule {
}
