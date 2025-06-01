import {NgModule} from "@angular/core";
import {NgStyle} from "@angular/common";
import {EditorBaseComponent, EditorComponent} from "@powell/components/editor";
import {LabelStarModule} from "@powell/pipes/label-star";
import {FormFieldModule} from "@powell/components/form-field";

@NgModule({
  declarations: [EditorComponent, EditorBaseComponent],
  exports: [EditorComponent],
  imports: [
    LabelStarModule,
    NgStyle,
    FormFieldModule
  ],
})
export class EditorModule {
}
