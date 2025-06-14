import {NgModule} from "@angular/core";
import {NgClass, NgStyle, NgTemplateOutlet} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {InputNumberComponent} from "@powell/components/input-number";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$InputNumberModule} from "@powell/primeng";
import {FormFieldModule} from "@powell/components/form-field";
import {TemplateModule} from "@powell/directives/template";

@NgModule({
  declarations: [InputNumberComponent],
  exports: [InputNumberComponent, TemplateModule],
  imports: [
    $InputNumberModule,
    NgClass,
    NgStyle,
    NgTemplateOutlet,
    FormsModule,
    LabelStarModule,
    FormFieldModule,
  ],
})
export class InputNumberModule {
}
