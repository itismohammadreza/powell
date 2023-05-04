import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FilePicker2Component} from "@powell/components/file-picker2";
import {LabelStarModule} from "@powell/pipes/label-star";
import {ButtonModule} from "@powell/components/button";

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
