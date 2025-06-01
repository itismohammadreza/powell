import {NgModule} from "@angular/core";
import {NgClass, NgStyle, NgTemplateOutlet} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SelectButtonComponent} from "@powell/components/select-button";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$SelectButtonModule} from "@powell/primeng";
import {FormFieldModule} from "@powell/components/form-field";

@NgModule({
  declarations: [SelectButtonComponent],
  exports: [SelectButtonComponent],
  imports: [
    $SelectButtonModule,
    NgClass,
    NgStyle,
    NgTemplateOutlet,
    FormsModule,
    LabelStarModule,
    FormFieldModule
  ],
})
export class SelectButtonModule {
}
