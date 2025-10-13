import {NgModule} from "@angular/core";
import {
  $FloatLabelModule,
  $IconFieldModule,
  $IftaLabelModule,
  $InputGroupAddonModule,
  $InputGroupModule,
  $InputIconModule,
  $MessageModule
} from "@powell/primeng";
import {FormFieldComponent} from "@powell/components/form-field/form-field.component";
import {KeyValuePipe, NgTemplateOutlet} from "@angular/common";
import {TemplateModule} from "@powell/directives/template";

@NgModule({
  declarations: [FormFieldComponent],
  exports: [FormFieldComponent, TemplateModule],
  imports: [
    KeyValuePipe,
    NgTemplateOutlet,
    $IftaLabelModule,
    $FloatLabelModule,
    $IconFieldModule,
    $InputIconModule,
    $InputGroupModule,
    $InputGroupAddonModule,
    $MessageModule,
    TemplateModule,
  ],
})
export class FormFieldModule {
}
