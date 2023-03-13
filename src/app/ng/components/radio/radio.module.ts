import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RadioButtonModule} from 'primeng/radiobutton';
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {RadioComponent} from "@ng/components/radio";
import {LabelStarModule} from "@ng/pipes/label-star";

@NgModule({
  declarations: [RadioComponent],
  imports: [
    RadioButtonModule,
    ConfigHandlerModule,
    LabelStarModule,
    CommonModule,
    FormsModule
  ],
  exports: [RadioComponent]
})
export class RadioModule {
}
