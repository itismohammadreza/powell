import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {EditorBaseComponent, EditorComponent} from "@ng/components/editor";
import {LabelStarModule} from "@ng/pipes/label-star";

@NgModule({
  declarations: [EditorComponent, EditorBaseComponent],
  exports: [EditorComponent],
  imports: [
    LabelStarModule,
    CommonModule
  ],
})
export class EditorModule {
}
