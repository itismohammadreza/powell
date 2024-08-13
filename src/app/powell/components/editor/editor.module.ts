import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {EditorBaseComponent, EditorComponent} from "@powell/components/editor";
import {LabelStarModule} from "@powell/pipes/label-star";

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
