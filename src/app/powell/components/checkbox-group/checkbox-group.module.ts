import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {CheckboxGroupComponent} from "src/app/powell/components/checkbox-group";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$CheckboxModule} from "@powell/primeng";

@NgModule({
  declarations: [CheckboxGroupComponent],
  exports: [CheckboxGroupComponent],
  imports: [
    $CheckboxModule,
    CommonModule,
    FormsModule,
    LabelStarModule
  ],
})
export class CheckboxGroupModule {
}
