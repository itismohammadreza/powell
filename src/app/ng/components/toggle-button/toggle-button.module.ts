import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ToggleButtonModule as PToggleButtonModule} from 'primeng/togglebutton';
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {ToggleButtonComponent} from "@ng/components/toggle-button";
import {LabelStarModule} from "@ng/pipes/label-star";

@NgModule({
  declarations: [ToggleButtonComponent],
  imports: [
    PToggleButtonModule,
    ConfigHandlerModule,
    LabelStarModule,
    CommonModule,
    FormsModule
  ],
  exports: [ToggleButtonComponent]
})

export class ToggleButtonModule {
}
