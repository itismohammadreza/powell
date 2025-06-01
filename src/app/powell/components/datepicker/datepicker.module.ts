import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {LabelStarModule} from "@powell/pipes/label-star";
import {DatepickerBaseModule} from "@powell/components/datepicker/datepicker-base";
import {DatepickerComponent} from "@powell/components/datepicker/datepicker.component";
import {FormFieldModule} from "@powell/components/form-field";
import {TemplateModule} from "@powell/directives/template";

@NgModule({
  declarations: [DatepickerComponent],
  exports: [DatepickerComponent, TemplateModule],
  imports: [
    DatepickerBaseModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    FormFieldModule,
  ],
})
export class DatepickerModule {
}
