import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FilePicker2Component} from "@ng/components/file-picker2";
import {LabelStarModule} from "@ng/pipes/label-star";
import {ButtonModule} from "@ng/components/button";

@NgModule({
  declarations: [FilePicker2Component],
  exports: [FilePicker2Component],
  imports: [
    ButtonModule,
    LabelStarModule,
    CommonModule,
  ],
})
export class FilePicker2Module {
}
