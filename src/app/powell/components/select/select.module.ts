import {NgModule} from "@angular/core";
import {NgClass, NgStyle, NgTemplateOutlet} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SelectComponent} from "@powell/components/select";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$SelectModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";
import {FormFieldModule} from "@powell/components/form-field";

@NgModule({
  declarations: [SelectComponent],
  exports: [SelectComponent, TemplateModule],
  imports: [
    $SelectModule,
    NgStyle,
    NgClass,
    NgTemplateOutlet,
    FormsModule,
    LabelStarModule,
    FormFieldModule,
  ],
})
export class SelectModule {
}
