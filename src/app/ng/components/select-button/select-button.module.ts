import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SelectButtonModule as PSelectButtonModule} from 'primeng/selectbutton';
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {SelectButtonComponent} from "@ng/components/select-button";
import {LabelStarModule} from "@ng/pipes/label-star";

@NgModule({
  declarations: [SelectButtonComponent],
  imports: [
    PSelectButtonModule,
    ConfigHandlerModule,
    LabelStarModule,
    CommonModule,
    FormsModule
  ],
  exports: [SelectButtonComponent]
})
export class SelectButtonModule {
}
