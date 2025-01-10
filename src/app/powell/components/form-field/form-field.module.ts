import {NgModule} from "@angular/core";
import {
  $FloatLabelModule,
  $IconFieldModule,
  $IftaLabelModule,
  $InputGroupAddonModule,
  $InputGroupModule,
  $InputIconModule
} from "@powell/primeng";
import {FormFieldComponent} from "@powell/components/form-field/form-field.component";
import {CommonModule} from "@angular/common";
import {TemplateModule} from "@powell/directives/template";

@NgModule({
  declarations: [FormFieldComponent],
  exports: [FormFieldComponent, TemplateModule],
  imports: [
    CommonModule,
    $IftaLabelModule,
    $FloatLabelModule,
    $IconFieldModule,
    $InputIconModule,
    $InputGroupModule,
    $InputGroupAddonModule,
    TemplateModule
  ],
})
export class FormFieldModule {
}
